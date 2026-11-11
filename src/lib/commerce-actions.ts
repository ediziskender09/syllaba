"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import {
  LIBRARY_PRICE_CENTS,
  lessonPriceToCents,
} from "@/lib/commerce";
import { getContentBySlugMeta } from "@/lib/content";
import { prisma } from "@/lib/prisma";

/**
 * Preview commerce grants until Creem checkout/webhooks are wired.
 * Same grant helpers will be called from Creem webhooks later.
 */
const PROVIDER = "preview";

async function requireUserId(callbackPath: string) {
  const session = await auth();
  if (!session?.user?.id) {
    redirect(`/login?callbackUrl=${encodeURIComponent(callbackPath)}`);
  }
  return session.user.id;
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
}) {
  const periodDays = input.periodDays ?? 30;
  const currentPeriodEnd = new Date(Date.now() + periodDays * 24 * 60 * 60 * 1000);

  return prisma.subscription.upsert({
    where: { userId: input.userId },
    create: {
      userId: input.userId,
      status: "active",
      provider: input.provider ?? PROVIDER,
      providerSubscriptionId: input.providerSubscriptionId,
      currentPeriodEnd,
    },
    update: {
      status: "active",
      provider: input.provider ?? PROVIDER,
      providerSubscriptionId: input.providerSubscriptionId,
      currentPeriodEnd,
    },
  });
}

export async function unlockLesson(formData: FormData) {
  const slug = String(formData.get("slug") || "").trim();
  if (!slug) {
    redirect("/catalog");
  }

  const userId = await requireUserId(`/learn/${slug}`);
  const lesson = getContentBySlugMeta(slug);
  if (!lesson) {
    redirect("/catalog");
  }

  await grantLessonPurchase({
    userId,
    lessonSlug: slug,
    amountCents: lessonPriceToCents(lesson.price),
  });

  revalidatePath(`/learn/${slug}`);
  revalidatePath("/account");
  revalidatePath("/catalog");
  redirect(`/learn/${slug}`);
}

export async function subscribeLibrary(formData: FormData) {
  const returnTo = String(formData.get("returnTo") || "/account").trim() || "/account";
  const userId = await requireUserId(returnTo);

  await grantLibrarySubscription({
    userId,
    // Store list price for audit via provider metadata later; period is 30 days.
  });

  // Keep amount trail via a sentinel purchase? Skip — subscription table is enough.
  void LIBRARY_PRICE_CENTS;

  revalidatePath("/account");
  revalidatePath("/catalog");
  revalidatePath("/pricing");
  if (returnTo.startsWith("/learn/")) {
    revalidatePath(returnTo);
  }
  redirect(returnTo.startsWith("/") ? returnTo : "/account");
}
