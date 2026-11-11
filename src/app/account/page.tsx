import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ContentCard } from "@/components/ContentCard";
import { auth, signOut } from "@/auth";
import { getAccountLibrary } from "@/lib/access";
import {
  formatDate,
  formatUsd,
  LIBRARY_PRICE_CENTS,
  LIBRARY_PRICE_USD,
  membershipCopy,
} from "@/lib/commerce";
import {
  cancelLibrary,
  resumeLibrary,
  subscribeLibrary,
} from "@/lib/commerce-actions";

export const metadata = {
  title: "Account",
  description: "Manage your Syllaba membership, purchases, and library access.",
};

type Props = {
  searchParams: Promise<{ notice?: string }>;
};

const notices: Record<string, { tone: "ok" | "warn" | "err"; text: string }> = {
  subscribed: {
    tone: "ok",
    text: "Library subscription is active. Every lesson in the catalog is unlocked on this account.",
  },
  "already-subscribed": {
    tone: "ok",
    text: "You already have an active library subscription.",
  },
  resumed: {
    tone: "ok",
    text: "Cancellation removed. Your library plan will renew at the end of the period.",
  },
  "cancel-scheduled": {
    tone: "warn",
    text: "Cancellation scheduled. You keep library access until the period end date below.",
  },
  "cancel-confirm": {
    tone: "warn",
    text: "To cancel, use the confirmation checkbox, then confirm cancellation.",
  },
  "cancel-failed": {
    tone: "err",
    text: "Could not cancel — no active library subscription was found.",
  },
  "resume-failed": {
    tone: "err",
    text: "Could not resume — there was no scheduled cancellation.",
  },
};

export default async function AccountPage({ searchParams }: Props) {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login?callbackUrl=/account");
  }

  const params = await searchParams;
  const notice = params.notice ? notices[params.notice] : null;
  const user = session.user;
  const library = await getAccountLibrary(user.id);
  const phase = library.membershipPhase;
  const copy = membershipCopy(phase, library.subscription?.currentPeriodEnd ?? null);
  const continueLearning = library.hasLibrary
    ? library.catalog.slice(0, 6)
    : library.purchasedLessons;

  return (
    <div className="shell py-10 md:py-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-soft/60">
            Account
          </p>
          <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl tracking-[-0.04em] text-ink">
            Membership & library
          </h1>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-ink-soft">
            Plan status, renewal, cancellation, and every lesson unlocked on{" "}
            {user.email ?? "your account"}.
          </p>
        </div>
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}
        >
          <button
            type="submit"
            className="rounded-xl border border-[var(--line)] bg-surface px-4 py-2.5 text-sm font-semibold text-ink transition hover:border-accent/30"
          >
            Sign out
          </button>
        </form>
      </div>

      {notice ? (
        <p
          className={`mt-6 rounded-xl border px-4 py-3 text-sm ${
            notice.tone === "ok"
              ? "border-accent/25 bg-accent/10 text-accent-deep"
              : notice.tone === "warn"
                ? "border-amber-200 bg-amber-50 text-amber-950"
                : "border-red-200 bg-red-50 text-red-800"
          }`}
        >
          {notice.text}
        </p>
      ) : null}

      <div className="mt-10 grid gap-6 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <section className="rounded-[1.5rem] border border-[var(--line)] bg-surface p-6 shadow-soft md:p-8">
          <div className="flex items-center gap-4">
            {user.image ? (
              <Image
                src={user.image}
                alt=""
                width={64}
                height={64}
                className="rounded-full"
              />
            ) : (
              <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent/15 text-xl font-semibold text-accent-deep">
                {(user.name ?? user.email ?? "U").slice(0, 1).toUpperCase()}
              </span>
            )}
            <div>
              <p className="font-[family-name:var(--font-display)] text-2xl tracking-[-0.02em] text-ink">
                {user.name ?? "Learner"}
              </p>
              <p className="mt-1 text-sm text-ink-soft">{user.email}</p>
            </div>
          </div>

          <div className="mt-8 grid gap-3 border-t border-[var(--line)] pt-6 sm:grid-cols-3">
            <Stat label="Membership" value={copy.badge} />
            <Stat
              label="Purchased lessons"
              value={String(library.purchasedLessons.length)}
            />
            <Stat label="Catalog" value={`${library.catalogCount} lessons`} />
          </div>
        </section>

        <section
          className={`rounded-[1.5rem] border p-6 shadow-soft md:p-8 ${
            library.hasLibrary
              ? "border-glow/30 bg-ink text-paper"
              : "border-[var(--line)] bg-surface text-ink"
          }`}
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p
                className={`text-xs font-semibold uppercase tracking-[0.16em] ${
                  library.hasLibrary ? "text-glow" : "text-ink-soft/60"
                }`}
              >
                Library plan
              </p>
              <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl tracking-[-0.02em]">
                {copy.title}
              </h2>
            </div>
            <span
              className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] ${
                library.hasLibrary
                  ? "bg-glow/15 text-glow"
                  : "bg-ink/5 text-ink-soft"
              }`}
            >
              {copy.badge}
            </span>
          </div>

          <p
            className={`mt-3 text-sm leading-relaxed ${
              library.hasLibrary ? "text-paper/70" : "text-ink-soft"
            }`}
          >
            {copy.detail}
          </p>

          <dl
            className={`mt-6 grid gap-3 text-sm sm:grid-cols-2 ${
              library.hasLibrary ? "text-paper/80" : "text-ink-soft"
            }`}
          >
            <div
              className={`rounded-xl border px-4 py-3 ${
                library.hasLibrary
                  ? "border-white/10 bg-white/5"
                  : "border-[var(--line)] bg-paper"
              }`}
            >
              <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] opacity-70">
                Price
              </dt>
              <dd className="mt-1 font-semibold text-inherit">
                {formatUsd(library.subscription?.amountCents ?? LIBRARY_PRICE_CENTS)}
                /mo
              </dd>
            </div>
            <div
              className={`rounded-xl border px-4 py-3 ${
                library.hasLibrary
                  ? "border-white/10 bg-white/5"
                  : "border-[var(--line)] bg-paper"
              }`}
            >
              <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] opacity-70">
                {phase === "canceling"
                  ? "Access until"
                  : phase === "active"
                    ? "Next renewal"
                    : "Period end"}
              </dt>
              <dd className="mt-1 font-semibold text-inherit">
                {formatDate(library.subscription?.currentPeriodEnd) ?? "—"}
              </dd>
            </div>
          </dl>

          <div className="mt-6 flex flex-wrap gap-3">
            {phase === "none" || phase === "canceled" || phase === "expired" ? (
              <form action={subscribeLibrary}>
                <input type="hidden" name="returnTo" value="/account" />
                <button
                  type="submit"
                  className="rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-paper transition hover:bg-accent-deep"
                >
                  Subscribe · ${LIBRARY_PRICE_USD}/mo
                </button>
              </form>
            ) : null}

            {phase === "active" ? (
              <>
                <Link
                  href="/catalog"
                  className="rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-paper transition hover:bg-accent-deep"
                >
                  Browse full catalog
                </Link>
                <details className="w-full rounded-xl border border-white/15 bg-white/5 p-4">
                  <summary className="cursor-pointer text-sm font-semibold text-paper">
                    Cancel subscription
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-paper/70">
                    Cancellation takes effect at period end (
                    {formatDate(library.subscription?.currentPeriodEnd) ?? "the renewal date"}
                    ). You keep full library access until then. One-time purchases stay yours.
                  </p>
                  <form action={cancelLibrary} className="mt-4 space-y-3">
                    <label className="flex items-start gap-2 text-sm text-paper/80">
                      <input
                        type="checkbox"
                        name="confirm"
                        value="cancel"
                        required
                        className="mt-1"
                      />
                      <span>
                        I understand library access ends after the current period, and I want to
                        cancel renewal.
                      </span>
                    </label>
                    <button
                      type="submit"
                      className="rounded-xl border border-white/20 px-4 py-2.5 text-sm font-semibold text-paper transition hover:bg-white/10"
                    >
                      Confirm cancellation
                    </button>
                  </form>
                </details>
              </>
            ) : null}

            {phase === "canceling" ? (
              <>
                <form action={resumeLibrary}>
                  <button
                    type="submit"
                    className="rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-paper transition hover:bg-accent-deep"
                  >
                    Keep my subscription
                  </button>
                </form>
                <Link
                  href="/catalog"
                  className="rounded-xl border border-white/15 px-5 py-2.5 text-sm font-semibold text-paper transition hover:bg-white/5"
                >
                  Browse while access lasts
                </Link>
              </>
            ) : null}

            {!library.hasLibrary ? (
              <Link
                href="/pricing"
                className="rounded-xl border border-[var(--line)] bg-paper px-5 py-2.5 text-sm font-semibold text-ink transition hover:border-accent/30"
              >
                Pricing details
              </Link>
            ) : null}
          </div>
        </section>
      </div>

      <section className="mt-10">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-soft/60">
              {library.hasLibrary ? "Library access" : "Owned lessons"}
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl tracking-[-0.03em] text-ink">
              {library.hasLibrary ? "Continue learning" : "Lessons you own forever"}
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-ink-soft">
              {library.hasLibrary
                ? "Your membership unlocks the full catalog. One-time purchases also stay listed below."
                : "Single-lesson unlocks remain on this account even without a subscription."}
            </p>
          </div>
          <Link href="/catalog" className="text-sm font-semibold text-accent-deep hover:underline">
            Open catalog
          </Link>
        </div>

        {continueLearning.length > 0 ? (
          <div className="mt-6 grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {continueLearning.map((item) => (
              <ContentCard
                key={item.slug}
                item={item}
                badge={library.hasLibrary ? "In library" : "Owned"}
              />
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-[1.4rem] border border-dashed border-[var(--line)] bg-surface px-6 py-12 text-center">
            <p className="font-[family-name:var(--font-display)] text-xl text-ink">
              No lessons unlocked yet
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-ink-soft">
              Preview any lesson free, then unlock a single module or subscribe for the full
              library.
            </p>
            <Link
              href="/catalog"
              className="mt-6 inline-flex rounded-xl bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition hover:bg-accent-deep"
            >
              Browse lessons
            </Link>
          </div>
        )}
      </section>

      <section className="mt-12">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-soft/60">
              Purchase history
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl tracking-[-0.03em] text-ink">
              One-time lesson unlocks
            </h2>
          </div>
        </div>

        {library.purchasedLessons.length > 0 ? (
          <div className="mt-6 overflow-hidden rounded-[1.4rem] border border-[var(--line)] bg-surface shadow-soft">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-[var(--line)] bg-paper/70 text-[11px] uppercase tracking-[0.12em] text-ink-soft/70">
                <tr>
                  <th className="px-4 py-3 font-semibold">Lesson</th>
                  <th className="hidden px-4 py-3 font-semibold sm:table-cell">Date</th>
                  <th className="px-4 py-3 font-semibold">Amount</th>
                  <th className="px-4 py-3 font-semibold" />
                </tr>
              </thead>
              <tbody>
                {library.purchasedLessons.map((item) => (
                  <tr key={item.purchaseId} className="border-b border-[var(--line)] last:border-b-0">
                    <td className="px-4 py-3">
                      <p className="font-medium text-ink">{item.title}</p>
                      <p className="text-xs text-ink-soft">{item.category}</p>
                    </td>
                    <td className="hidden px-4 py-3 text-ink-soft sm:table-cell">
                      {formatDate(item.purchasedAt)}
                    </td>
                    <td className="px-4 py-3 text-ink">
                      {formatUsd(item.amountCents, item.currency)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        href={`/learn/${item.slug}`}
                        className="font-semibold text-accent-deep hover:underline"
                      >
                        Open
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="mt-4 rounded-[1.2rem] border border-[var(--line)] bg-surface px-5 py-6 text-sm text-ink-soft">
            No one-time lesson purchases yet. Library membership is separate and managed above.
          </p>
        )}
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-[var(--line)] bg-paper px-4 py-3">
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-soft/60">
        {label}
      </p>
      <p className="mt-1 font-[family-name:var(--font-display)] text-xl text-ink">{value}</p>
    </div>
  );
}
