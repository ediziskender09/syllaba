import { Webhook } from "@creem_io/nextjs";
import { LIBRARY_PRICE_CENTS } from "@/lib/commerce";
import {
  grantLessonPurchase,
  grantLibrarySubscription,
} from "@/lib/commerce-grants";
import { prisma } from "@/lib/prisma";

function metaString(
  metadata: Record<string, unknown> | null | undefined,
  key: string,
) {
  const value = metadata?.[key];
  return typeof value === "string" && value.length > 0 ? value : null;
}

function parseDate(value: unknown) {
  if (!value) return null;
  if (value instanceof Date) return value;
  if (typeof value === "string" || typeof value === "number") {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
  }
  return null;
}

async function applyLibraryFromSubscription(data: {
  id?: string;
  metadata?: Record<string, unknown> | null;
  current_period_end_date?: string | Date | null;
  status?: string;
  cancel_at_period?: boolean | null;
  canceled_at?: string | Date | null;
}) {
  const userId =
    metaString(data.metadata, "referenceId") ||
    metaString(data.metadata, "userId");
  if (!userId) return;

  await grantLibrarySubscription({
    userId,
    provider: "creem",
    providerSubscriptionId: data.id,
    amountCents: LIBRARY_PRICE_CENTS,
    currentPeriodEnd: parseDate(data.current_period_end_date),
    status: data.status === "trialing" ? "trialing" : "active",
    cancelAtPeriodEnd: Boolean(data.cancel_at_period),
    canceledAt: parseDate(data.canceled_at),
  });
}

export const POST = Webhook({
  webhookSecret: process.env.CREEM_WEBHOOK_SECRET!,
  onCheckoutCompleted: async (data) => {
    const metadata = (data.metadata ?? {}) as Record<string, unknown>;
    const type = metaString(metadata, "type");
    const userId =
      metaString(metadata, "referenceId") || metaString(metadata, "userId");
    if (!userId) return;

    if (type === "lesson") {
      const lessonSlug = metaString(metadata, "lessonSlug");
      if (!lessonSlug) return;
      const amountFromMeta = Number(metaString(metadata, "amountCents") || "");
      const amountCents =
        Number.isFinite(amountFromMeta) && amountFromMeta > 0
          ? amountFromMeta
          : data.order?.amount ?? 0;

      await grantLessonPurchase({
        userId,
        lessonSlug,
        amountCents,
        provider: "creem",
        providerOrderId: data.order?.id ?? data.id,
      });
      return;
    }

    if (type === "library" || data.subscription) {
      const subscription = data.subscription as
        | {
            id?: string;
            current_period_end_date?: string;
            status?: string;
            cancel_at_period?: boolean;
            canceled_at?: string;
            metadata?: Record<string, unknown>;
          }
        | undefined;

      await grantLibrarySubscription({
        userId,
        provider: "creem",
        providerSubscriptionId: subscription?.id,
        amountCents: LIBRARY_PRICE_CENTS,
        currentPeriodEnd: parseDate(subscription?.current_period_end_date),
        status: subscription?.status === "trialing" ? "trialing" : "active",
        cancelAtPeriodEnd: Boolean(subscription?.cancel_at_period),
        canceledAt: parseDate(subscription?.canceled_at),
      });
    }
  },
  onGrantAccess: async (data) => {
    await applyLibraryFromSubscription(data);
  },
  onSubscriptionScheduledCancel: async (data) => {
    const userId =
      metaString(data.metadata as Record<string, unknown>, "referenceId") ||
      metaString(data.metadata as Record<string, unknown>, "userId");
    if (!userId) return;

    await prisma.subscription.updateMany({
      where: {
        OR: [
          { userId },
          { providerSubscriptionId: data.id },
        ],
      },
      data: {
        cancelAtPeriodEnd: true,
        canceledAt: parseDate(data.canceled_at) ?? new Date(),
        status: "active",
        currentPeriodEnd: parseDate(data.current_period_end_date) ?? undefined,
        provider: "creem",
        providerSubscriptionId: data.id,
      },
    });
  },
  onRevokeAccess: async (data) => {
    const userId =
      metaString(data.metadata as Record<string, unknown>, "referenceId") ||
      metaString(data.metadata as Record<string, unknown>, "userId");

    await prisma.subscription.updateMany({
      where: userId
        ? {
            OR: [{ userId }, { providerSubscriptionId: data.id }],
          }
        : { providerSubscriptionId: data.id },
      data: {
        status: "canceled",
        cancelAtPeriodEnd: false,
        canceledAt: parseDate(data.canceled_at) ?? new Date(),
        currentPeriodEnd: parseDate(data.current_period_end_date) ?? new Date(),
        provider: "creem",
        providerSubscriptionId: data.id,
      },
    });
  },
  onSubscriptionPaid: async (data) => {
    await applyLibraryFromSubscription(data);
  },
});
