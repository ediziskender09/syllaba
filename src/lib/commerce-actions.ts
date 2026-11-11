"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import {
  getMembershipPhase,
  hasLibraryAccess,
  LIBRARY_PERIOD_DAYS,
  LIBRARY_PRICE_CENTS,
  lessonPriceToCents,
  type SubscriptionRecord,
} from "@/lib/commerce";
import { getContentBySlugMeta } from "@/lib/content";
import { prisma } from "@/lib/prisma";

/**
 * Preview commerce until Creem checkout/webhooks are wired.
 * Grant/cancel helpers stay the same for provider webhooks later.
 */
const PROVIDER = "preview";

async function requireUserId(callbackPath: string) {
  const session = await auth();
  if (!session?.user?.id) {
    redirect(`/login?callbackUrl=${encodeURIComponent(callbackPath)}`);
  }
  return session.user.id;
}

function revalidateCommerce(paths: string[] = []) {
  for (const path of ["/account", "/catalog", "/pricing", ...paths]) {
    revalidatePath(path);
  }
}

function toRecord(sub: {
  status: string;
  currentPeriodEnd: Date | null;
  cancelAtPeriodEnd: boolean;
  canceledAt: Date | null;
  amountCents: number;
  currency: string;
  provider: string;
}): SubscriptionRecord {
  return {
    status: sub.status,
    currentPeriodEnd: sub.currentPeriodEnd,
    cancelAtPeriodEnd: sub.cancelAtPeriodEnd,
    canceledAt: sub.canceledAt,
    amountCents: sub.amountCents,
    currency: sub.currency,
    provider: sub.provider,
  };
}

export async function grantLessonPurchase(input: {
  userId: string;
  lessonSlug: string;
  amountCents: number;
  provider?: string;
  providerOrderId?: string;
}) {
  return prisma.purchase.upsert({
    where: {
      userId_lessonSlug: {
        userId: input.userId,
        lessonSlug: input.lessonSlug,
      },
    },
    create: {
      userId: input.userId,
      lessonSlug: input.lessonSlug,
      amountCents: input.amountCents,
      currency: "usd",
      provider: input.provider ?? PROVIDER,
      providerOrderId: input.providerOrderId,
    },
    update: {
      amountCents: input.amountCents,
      provider: input.provider ?? PROVIDER,
      providerOrderId: input.providerOrderId,
    },
  });
}

export async function grantLibrarySubscription(input: {
  userId: string;
  provider?: string;
  providerSubscriptionId?: string;
  periodDays?: number;
  amountCents?: number;
}) {
  const periodDays = input.periodDays ?? LIBRARY_PERIOD_DAYS;
  const currentPeriodEnd = new Date(Date.now() + periodDays * 24 * 60 * 60 * 1000);

  return prisma.subscription.upsert({
    where: { userId: input.userId },
    create: {
      userId: input.userId,
      status: "active",
      provider: input.provider ?? PROVIDER,
      providerSubscriptionId: input.providerSubscriptionId,
      amountCents: input.amountCents ?? LIBRARY_PRICE_CENTS,
      currency: "usd",
      cancelAtPeriodEnd: false,
      canceledAt: null,
      currentPeriodEnd,
    },
    update: {
      status: "active",
      provider: input.provider ?? PROVIDER,
      providerSubscriptionId: input.providerSubscriptionId,
      amountCents: input.amountCents ?? LIBRARY_PRICE_CENTS,
      cancelAtPeriodEnd: false,
      canceledAt: null,
      currentPeriodEnd,
    },
  });
}

export async function scheduleLibraryCancellation(userId: string) {
  const sub = await prisma.subscription.findUnique({ where: { userId } });
  if (!sub || !hasLibraryAccess(toRecord(sub))) {
    return { ok: false as const, error: "No active library subscription to cancel." };
  }

  const updated = await prisma.subscription.update({
    where: { userId },
    data: {
      cancelAtPeriodEnd: true,
      canceledAt: new Date(),
      // Keep status active until period end so access + UX stay correct.
      status: "active",
    },
  });

  return { ok: true as const, subscription: updated };
}

export async function resumeLibrarySubscription(userId: string) {
  const sub = await prisma.subscription.findUnique({ where: { userId } });
  if (!sub) {
    return { ok: false as const, error: "No subscription found." };
  }

  const phase = getMembershipPhase(toRecord(sub));
  if (phase !== "canceling") {
    return { ok: false as const, error: "There is no scheduled cancellation to resume." };
  }

  const updated = await prisma.subscription.update({
    where: { userId },
    data: {
      cancelAtPeriodEnd: false,
      canceledAt: null,
      status: "active",
    },
  });

  return { ok: true as const, subscription: updated };
}

export async function unlockLesson(formData: FormData) {
  const slug = String(formData.get("slug") || "").trim();
  if (!slug) redirect("/catalog");

  const userId = await requireUserId(`/learn/${slug}`);
  const lesson = getContentBySlugMeta(slug);
  if (!lesson) redirect("/catalog");

  const existingSub = await prisma.subscription.findUnique({ where: { userId } });
  if (existingSub && hasLibraryAccess(toRecord(existingSub))) {
    revalidateCommerce([`/learn/${slug}`]);
    redirect(`/learn/${slug}`);
  }

  await grantLessonPurchase({
    userId,
    lessonSlug: slug,
    amountCents: lessonPriceToCents(lesson.price),
  });

  revalidateCommerce([`/learn/${slug}`]);
  redirect(`/learn/${slug}`);
}

export async function subscribeLibrary(formData: FormData) {
  const returnTo = String(formData.get("returnTo") || "/account").trim() || "/account";
  const userId = await requireUserId(returnTo);

  const existing = await prisma.subscription.findUnique({ where: { userId } });
  if (existing) {
    const phase = getMembershipPhase(toRecord(existing));
    if (phase === "active") {
      redirect("/account?notice=already-subscribed");
    }
    if (phase === "canceling") {
      await resumeLibrarySubscription(userId);
      revalidateCommerce([returnTo.startsWith("/learn/") ? returnTo : "/account"]);
      redirect("/account?notice=resumed");
    }
  }

  await grantLibrarySubscription({ userId });

  const safeReturn = returnTo.startsWith("/") ? returnTo.split("?")[0] : "/account";
  revalidateCommerce([safeReturn.startsWith("/learn/") ? safeReturn : "/account"]);
  if (safeReturn === "/account" || safeReturn === "/pricing") {
    redirect("/account?notice=subscribed");
  }
  redirect(safeReturn);
}

export async function cancelLibrary(formData: FormData) {
  const userId = await requireUserId("/account");
  const confirm = String(formData.get("confirm") || "");
  if (confirm !== "cancel") {
    redirect("/account?notice=cancel-confirm");
  }

  const result = await scheduleLibraryCancellation(userId);
  revalidateCommerce();
  redirect(result.ok ? "/account?notice=cancel-scheduled" : "/account?notice=cancel-failed");
}

export async function resumeLibrary(formData: FormData) {
  void formData;
  const userId = await requireUserId("/account");
  const result = await resumeLibrarySubscription(userId);
  revalidateCommerce();
  redirect(result.ok ? "/account?notice=resumed" : "/account?notice=resume-failed");
}
