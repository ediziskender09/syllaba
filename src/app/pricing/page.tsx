import Link from "next/link";
import { auth } from "@/auth";
import { getAccessSnapshot } from "@/lib/access";
import { LIBRARY_PRICE_USD } from "@/lib/commerce";
import { subscribeLibrary } from "@/lib/commerce-actions";

export const metadata = {
  title: "Pricing",
  description: "Subscribe to Syllaba for full library access to every lesson.",
};

export default async function PricingPage() {
  const session = await auth();
  const access = session?.user?.id ? await getAccessSnapshot(session.user.id) : null;

  return (
    <div className="shell py-10 md:py-14">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-soft/60">
          Pricing
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl tracking-[-0.04em] md:text-5xl">
          One plan. Full library.
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">
          Subscribe once and unlock every Syllaba lesson while your membership is active.
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-md">
        <div className="flex h-full flex-col rounded-[1.5rem] border border-glow/30 bg-ink p-6 text-paper shadow-lift md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-glow">
            Library subscription
          </p>
          <p className="mt-3 font-[family-name:var(--font-display)] text-4xl tracking-[-0.03em]">
            ${LIBRARY_PRICE_USD}
            <span className="ml-2 text-base font-medium text-paper/55">/ month</span>
          </p>
          <p className="mt-3 text-sm leading-relaxed text-paper/70">
            One subscription. Full access to every lesson in the Syllaba library.
          </p>
          <ul className="mt-5 flex-1 space-y-2 text-sm">
            {[
              "All current lessons unlocked",
              "New lessons included while subscribed",
              "Access saved to your account",
              "Cancel anytime",
            ].map((point) => (
              <li key={point} className="flex gap-2">
                <span className="text-glow">✓</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>

          {access?.hasLibrary ||
          access?.membershipPhase === "canceling" ||
          access?.membershipPhase === "active" ? (
            <Link
              href="/account"
              className="mt-7 inline-flex justify-center rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-paper transition hover:bg-accent-deep"
            >
              {access.membershipPhase === "canceling"
                ? "Manage cancellation"
                : "Manage subscription"}
            </Link>
          ) : session?.user ? (
            <form action={subscribeLibrary} className="mt-7">
              <input type="hidden" name="returnTo" value="/account" />
              <button
                type="submit"
                className="w-full rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-paper transition hover:bg-accent-deep"
              >
                Subscribe · ${LIBRARY_PRICE_USD}/mo
              </button>
            </form>
          ) : (
            <Link
              href="/login?callbackUrl=/pricing"
              className="mt-7 inline-flex justify-center rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-paper transition hover:bg-accent-deep"
            >
              Sign in to subscribe
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
