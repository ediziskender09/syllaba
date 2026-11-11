import {
  LIBRARY_PERIOD_DAYS,
  LIBRARY_PRICE_CENTS,
} from "@/lib/commerce";
import { prisma } from "@/lib/prisma";

const DEFAULT_PROVIDER = "preview";

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
      provider: input.provider ?? DEFAULT_PROVIDER,
      providerOrderId: input.providerOrderId,
    },
    update: {
      amountCents: input.amountCents,
      provider: input.provider ?? DEFAULT_PROVIDER,
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
  currentPeriodEnd?: Date | null;
  status?: string;
  cancelAtPeriodEnd?: boolean;
  canceledAt?: Date | null;
}) {
  const periodDays = input.periodDays ?? LIBRARY_PERIOD_DAYS;
  const currentPeriodEnd =
    input.currentPeriodEnd ??
    new Date(Date.now() + periodDays * 24 * 60 * 60 * 1000);

  return prisma.subscription.upsert({
    where: { userId: input.userId },
    create: {
      userId: input.userId,
      status: input.status ?? "active",
      provider: input.provider ?? DEFAULT_PROVIDER,
      providerSubscriptionId: input.providerSubscriptionId,
      amountCents: input.amountCents ?? LIBRARY_PRICE_CENTS,
      currency: "usd",
      cancelAtPeriodEnd: input.cancelAtPeriodEnd ?? false,
      canceledAt: input.canceledAt ?? null,
      currentPeriodEnd,
    },
    update: {
      status: input.status ?? "active",
      provider: input.provider ?? DEFAULT_PROVIDER,
      providerSubscriptionId: input.providerSubscriptionId,
      amountCents: input.amountCents ?? LIBRARY_PRICE_CENTS,
      cancelAtPeriodEnd: input.cancelAtPeriodEnd ?? false,
      canceledAt: input.canceledAt ?? null,
      currentPeriodEnd,
    },
  });
}
