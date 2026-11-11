import {
  getMembershipPhase,
  hasLibraryAccess,
  type MembershipPhase,
  type SubscriptionRecord,
} from "@/lib/commerce";
import { getAllContentMeta } from "@/lib/content";
import { prisma } from "@/lib/prisma";

export type AccessSnapshot = {
  userId: string;
  hasLibrary: boolean;
  membershipPhase: MembershipPhase;
  subscription: (SubscriptionRecord & { id: string }) | null;
  purchasedSlugs: string[];
};

function toSubscriptionRecord(
  sub: {
    id: string;
    status: string;
    currentPeriodEnd: Date | null;
    cancelAtPeriodEnd: boolean;
    canceledAt: Date | null;
    amountCents: number;
    currency: string;
    provider: string;
  } | null,
): (SubscriptionRecord & { id: string }) | null {
  if (!sub) return null;
  return {
    id: sub.id,
    status: sub.status,
    currentPeriodEnd: sub.currentPeriodEnd,
    cancelAtPeriodEnd: sub.cancelAtPeriodEnd,
    canceledAt: sub.canceledAt,
    amountCents: sub.amountCents,
    currency: sub.currency,
    provider: sub.provider,
  };
}

/** Normalize expired rows so status matches reality. */
async function syncExpiredSubscription(userId: string) {
  const sub = await prisma.subscription.findUnique({ where: { userId } });
  if (!sub?.currentPeriodEnd) return sub;

  const expired = sub.currentPeriodEnd.getTime() <= Date.now();
  if (!expired) return sub;

  if (sub.status === "active" || sub.status === "trialing" || sub.cancelAtPeriodEnd) {
    return prisma.subscription.update({
      where: { userId },
      data: {
        status: "canceled",
        cancelAtPeriodEnd: false,
        canceledAt: sub.canceledAt ?? new Date(),
      },
    });
  }

  return sub;
}

export async function getAccessSnapshot(userId: string): Promise<AccessSnapshot> {
  const [subscription, purchases] = await Promise.all([
    syncExpiredSubscription(userId),
    prisma.purchase.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        lessonSlug: true,
        amountCents: true,
        currency: true,
        createdAt: true,
        provider: true,
      },
    }),
  ]);

  const record = toSubscriptionRecord(subscription);

  return {
    userId,
    hasLibrary: hasLibraryAccess(record),
    membershipPhase: getMembershipPhase(record),
    subscription: record,
    purchasedSlugs: purchases.map((p) => p.lessonSlug),
  };
}

export async function hasLessonAccess(userId: string | undefined, lessonSlug: string) {
  if (!userId) return false;
  const access = await getAccessSnapshot(userId);
  if (access.hasLibrary) return true;
  return access.purchasedSlugs.includes(lessonSlug);
}

export async function getAccountLibrary(userId: string) {
  const access = await getAccessSnapshot(userId);
  const catalog = getAllContentMeta();
  const bySlug = new Map(catalog.map((item) => [item.slug, item]));

  const purchaseRows = await prisma.purchase.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  const purchasedLessons = purchaseRows
    .map((row) => {
      const meta = bySlug.get(row.lessonSlug);
      if (!meta) return null;
      return {
        ...meta,
        purchasedAt: row.createdAt,
        amountCents: row.amountCents,
        currency: row.currency,
        purchaseId: row.id,
      };
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  return {
    ...access,
    purchasedLessons,
    catalogCount: catalog.length,
    catalog,
  };
}
