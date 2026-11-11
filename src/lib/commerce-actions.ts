"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import {
  getMembershipPhase,
  hasLibraryAccess,
  type SubscriptionRecord,
} from "@/lib/commerce";
import { getContentBySlugMeta } from "@/lib/content";
import {
  cancelCreemSubscriptionScheduled,
  createLessonCheckout,
  createLibraryCheckout,
  isCreemConfigured,
  resumeCreemSubscription,
} from "@/lib/creem";
import { prisma } from "@/lib/prisma";
import { safeRedirectPath } from "@/lib/safe-redirect";

const CREEM_PROVIDER = "creem";

async function requireUser(callbackPath: string) {
  const safeCallback = safeRedirectPath(callbackPath, "/account");
  const session = await auth();
  if (!session?.user?.id) {
    redirect(`/login?callbackUrl=${encodeURIComponent(safeCallback)}`);
  }
  if (!session.user.email) {
    redirect(`/login?callbackUrl=${encodeURIComponent(safeCallback)}`);
  }
  return {
    id: session.user.id,
    email: session.user.email,
    name: session.user.name,
  };
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

/** Internal helper — not exported (would become a public Server Action). */
async function scheduleLibraryCancellation(userId: string) {
  const sub = await prisma.subscription.findUnique({ where: { userId } });
  if (!sub || !hasLibraryAccess(toRecord(sub))) {
    return { ok: false as const, error: "No active library subscription to cancel." };
  }

  if (sub.provider === CREEM_PROVIDER && sub.providerSubscriptionId && isCreemConfigured()) {
    await cancelCreemSubscriptionScheduled(sub.providerSubscriptionId);
  }

  const updated = await prisma.subscription.update({
    where: { userId },
    data: {
      cancelAtPeriodEnd: true,
      canceledAt: new Date(),
      status: "active",
    },
  });

  return { ok: true as const, subscription: updated };
}

/** Internal helper — not exported (would become a public Server Action). */
async function resumeLibrarySubscription(userId: string) {
  const sub = await prisma.subscription.findUnique({ where: { userId } });
  if (!sub) {
    return { ok: false as const, error: "No subscription found." };
  }

  const phase = getMembershipPhase(toRecord(sub));
  if (phase !== "canceling") {
    return { ok: false as const, error: "There is no scheduled cancellation to resume." };
  }

  if (sub.provider === CREEM_PROVIDER && sub.providerSubscriptionId && isCreemConfigured()) {
    await resumeCreemSubscription(sub.providerSubscriptionId);
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

  const user = await requireUser(`/learn/${slug}`);
  const lesson = getContentBySlugMeta(slug);
  if (!lesson) redirect("/catalog");

  const existingSub = await prisma.subscription.findUnique({ where: { userId: user.id } });
  if (existingSub && hasLibraryAccess(toRecord(existingSub))) {
    revalidateCommerce([`/learn/${slug}`]);
    redirect(`/learn/${slug}`);
  }

  const existingPurchase = await prisma.purchase.findUnique({
    where: { userId_lessonSlug: { userId: user.id, lessonSlug: slug } },
  });
  if (existingPurchase) {
    revalidateCommerce([`/learn/${slug}`]);
    redirect(`/learn/${slug}`);
  }

  if (!isCreemConfigured()) {
    redirect("/account?notice=creem-missing");
  }

  const checkout = await createLessonCheckout({
    userId: user.id,
    email: user.email,
    name: user.name,
    lessonSlug: slug,
    priceUsd: lesson.price,
    lessonTitle: lesson.title,
  });

  if (!checkout.checkoutUrl) {
    redirect(`/learn/${slug}?error=checkout`);
  }

  redirect(checkout.checkoutUrl);
}

export async function subscribeLibrary(formData: FormData) {
  const returnTo = safeRedirectPath(formData.get("returnTo"), "/account");
  const user = await requireUser(returnTo);

  const existing = await prisma.subscription.findUnique({ where: { userId: user.id } });
  if (existing) {
    const phase = getMembershipPhase(toRecord(existing));
    if (phase === "active") {
      redirect("/account?notice=already-subscribed");
    }
    if (phase === "canceling") {
      await resumeLibrarySubscription(user.id);
      revalidateCommerce();
      redirect("/account?notice=resumed");
    }
  }

  if (!isCreemConfigured()) {
    redirect("/account?notice=creem-missing");
  }

  const checkout = await createLibraryCheckout({
    userId: user.id,
    email: user.email,
    name: user.name,
  });

  if (!checkout.checkoutUrl) {
    redirect("/pricing?error=checkout");
  }

  redirect(checkout.checkoutUrl);
}

export async function cancelLibrary(formData: FormData) {
  const user = await requireUser("/account");
  const confirm = String(formData.get("confirm") || "");
  if (confirm !== "cancel") {
    redirect("/account?notice=cancel-confirm");
  }

  const result = await scheduleLibraryCancellation(user.id);
  revalidateCommerce();
  redirect(result.ok ? "/account?notice=cancel-scheduled" : "/account?notice=cancel-failed");
}

export async function resumeLibrary(formData: FormData) {
  void formData;
  const user = await requireUser("/account");
  const result = await resumeLibrarySubscription(user.id);
  revalidateCommerce();
  redirect(result.ok ? "/account?notice=resumed" : "/account?notice=resume-failed");
}
