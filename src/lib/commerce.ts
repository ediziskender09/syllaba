export const LIBRARY_PRICE_CENTS = 3999;
export const LIBRARY_PRICE_USD = 39.99;

export const ACTIVE_SUBSCRIPTION_STATUSES = new Set([
  "active",
  "trialing",
  "past_due",
]);

export function lessonPriceToCents(priceUsd: number) {
  return Math.round(priceUsd * 100);
}

export function formatUsd(cents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

export function isSubscriptionActive(sub: {
  status: string;
  currentPeriodEnd: Date | null;
} | null) {
  if (!sub) return false;
  if (!ACTIVE_SUBSCRIPTION_STATUSES.has(sub.status)) return false;
  if (sub.currentPeriodEnd && sub.currentPeriodEnd.getTime() < Date.now()) {
    return false;
  }
  return true;
}
