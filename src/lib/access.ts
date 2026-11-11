import { isSubscriptionActive } from "@/lib/commerce";
import { prisma } from "@/lib/prisma";
import { getAllContentMeta } from "@/lib/content";

export type AccessSnapshot = {
  userId: string;
  hasLibrary: boolean;
  subscription: {
    status: string;
    currentPeriodEnd: Date | null;
    provider: string;
  } | null;
  purchasedSlugs: string[];
};

export async function getAccessSnapshot(userId: string): Promise<AccessSnapshot> {
  const [subscription, purchases] = await Promise.all([
    prisma.subscription.findUnique({ where: { userId } }),
    prisma.purchase.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      select: { lessonSlug: true },
    }),
  ]);

  return {
    userId,
    hasLibrary: isSubscriptionActive(subscription),
    subscription: subscription
      ? {
          status: subscription.status,
          currentPeriodEnd: subscription.currentPeriodEnd,
          provider: subscription.provider,
        }
      : null,
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

  const purchasedLessons = access.purchasedSlugs
    .map((slug) => bySlug.get(slug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  return {
    ...access,
    purchasedLessons,
    catalogCount: catalog.length,
  };
}
