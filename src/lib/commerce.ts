export const LIBRARY_PRICE_CENTS = 3999;
export const LIBRARY_PRICE_USD = 39.99;
export const LIBRARY_PERIOD_DAYS = 30;

export type MembershipPhase =
  | "none"
  | "active"
  | "canceling"
  | "canceled"
  | "expired";

export type SubscriptionRecord = {
  status: string;
  currentPeriodEnd: Date | null;
  cancelAtPeriodEnd: boolean;
  canceledAt: Date | null;
  amountCents: number;
  currency: string;
  provider: string;
};

export function lessonPriceToCents(priceUsd: number) {
  return Math.round(priceUsd * 100);
}

export function formatUsd(cents: number, currency = "usd") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(cents / 100);
}

export function formatDate(date: Date | null | undefined) {
  if (!date) return null;
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function periodStillValid(sub: Pick<SubscriptionRecord, "currentPeriodEnd">) {
  if (!sub.currentPeriodEnd) return false;
  return sub.currentPeriodEnd.getTime() > Date.now();
}

/** Library content access right now (including canceled-but-paid-through). */
export function hasLibraryAccess(sub: SubscriptionRecord | null) {
  if (!sub) return false;
  if (!periodStillValid(sub)) return false;
  return (
    sub.status === "active" ||
    sub.status === "trialing" ||
    sub.status === "past_due" ||
    (sub.status === "canceled" && Boolean(sub.cancelAtPeriodEnd))
  );
}

export function getMembershipPhase(sub: SubscriptionRecord | null): MembershipPhase {
  if (!sub) return "none";

  const inPeriod = periodStillValid(sub);

  if (sub.status === "active" || sub.status === "trialing" || sub.status === "past_due") {
    if (sub.cancelAtPeriodEnd && inPeriod) return "canceling";
    if (inPeriod) return "active";
    return "expired";
  }

  if (sub.status === "canceled") {
    if (sub.cancelAtPeriodEnd && inPeriod) return "canceling";
    if (inPeriod) return "canceled";
    return "expired";
  }

  if (inPeriod) return "active";
  return sub.status === "inactive" ? "none" : "expired";
}

export function membershipCopy(phase: MembershipPhase, periodEnd: Date | null) {
  const end = formatDate(periodEnd);

  switch (phase) {
    case "active":
      return {
        title: "Library subscription active",
        detail: end
          ? `Next renewal ${end}. Full catalog access while membership renews.`
          : "Full catalog access while membership is active.",
        badge: "Active",
      };
    case "canceling":
      return {
        title: "Cancellation scheduled",
        detail: end
          ? `You keep full library access until ${end}. After that, only separately purchased lessons stay unlocked.`
          : "You keep access until the end of the current billing period.",
        badge: "Ends soon",
      };
    case "canceled":
      return {
        title: "Subscription canceled",
        detail: "Library access has ended. One-time lesson purchases remain on your account.",
        badge: "Canceled",
      };
    case "expired":
      return {
        title: "Subscription expired",
        detail: "Your billing period ended. Resubscribe to reopen the full library.",
        badge: "Expired",
      };
    default:
      return {
        title: "No active subscription",
        detail: `Subscribe for ${formatUsd(LIBRARY_PRICE_CENTS)}/mo to unlock the entire Syllaba library.`,
        badge: "Inactive",
      };
  }
}
