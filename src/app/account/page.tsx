import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ContentCard } from "@/components/ContentCard";
import { auth, signOut } from "@/auth";
import { getAccountLibrary } from "@/lib/access";
import { formatUsd, LIBRARY_PRICE_CENTS, LIBRARY_PRICE_USD } from "@/lib/commerce";
import { subscribeLibrary } from "@/lib/commerce-actions";
import { getAllContentMeta } from "@/lib/content";

export const metadata = {
  title: "Account",
  description: "Your Syllaba library, purchases, and membership.",
};

export default async function AccountPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login?callbackUrl=/account");
  }

  const user = session.user;
  const library = await getAccountLibrary(user.id);
  const catalog = getAllContentMeta();
  const continueLearning = library.hasLibrary
    ? catalog.slice(0, 6)
    : library.purchasedLessons;

  return (
    <div className="shell py-10 md:py-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-soft/60">
            Account
          </p>
          <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl tracking-[-0.04em] text-ink">
            Your library
          </h1>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-ink-soft">
            Membership, purchases, and lessons you can open anytime — tied to{" "}
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

      <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
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
            <Stat
              label="Library"
              value={library.hasLibrary ? "Active" : "Inactive"}
            />
            <Stat
              label="Purchased lessons"
              value={String(library.purchasedLessons.length)}
            />
            <Stat label="Catalog size" value={String(library.catalogCount)} />
          </div>
        </section>

        <section
          className={`rounded-[1.5rem] border p-6 shadow-soft md:p-8 ${
            library.hasLibrary
              ? "border-glow/30 bg-ink text-paper"
              : "border-[var(--line)] bg-surface"
          }`}
        >
          <p
            className={`text-xs font-semibold uppercase tracking-[0.16em] ${
              library.hasLibrary ? "text-glow" : "text-ink-soft/60"
            }`}
          >
            Membership
          </p>
          <h2
            className={`mt-2 font-[family-name:var(--font-display)] text-2xl tracking-[-0.02em] ${
              library.hasLibrary ? "text-paper" : "text-ink"
            }`}
          >
            {library.hasLibrary ? "Library subscription active" : "No active subscription"}
          </h2>
          <p
            className={`mt-3 text-sm leading-relaxed ${
              library.hasLibrary ? "text-paper/70" : "text-ink-soft"
            }`}
          >
            {library.hasLibrary
              ? `Full access to all ${library.catalogCount} lessons${
                  library.subscription?.currentPeriodEnd
                    ? ` · renews/ends ${library.subscription.currentPeriodEnd.toLocaleDateString(
                        "en-US",
                        { month: "short", day: "numeric", year: "numeric" },
                      )}`
                    : ""
                }.`
              : `Subscribe for ${formatUsd(LIBRARY_PRICE_CENTS)}/mo to unlock the entire Syllaba library.`}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {library.hasLibrary ? (
              <Link
                href="/catalog"
                className="rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-paper transition hover:bg-accent-deep"
              >
                Browse full catalog
              </Link>
            ) : (
              <form action={subscribeLibrary}>
                <input type="hidden" name="returnTo" value="/account" />
                <button
                  type="submit"
                  className="rounded-xl bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition hover:bg-accent-deep"
                >
                  Subscribe · ${LIBRARY_PRICE_USD}/mo
                </button>
              </form>
            )}
            <Link
              href="/pricing"
              className={`rounded-xl border px-5 py-2.5 text-sm font-semibold transition ${
                library.hasLibrary
                  ? "border-white/15 text-paper hover:bg-white/5"
                  : "border-[var(--line)] bg-paper text-ink hover:border-accent/30"
              }`}
            >
              Pricing details
            </Link>
          </div>
        </section>
      </div>

      <section className="mt-10">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-soft/60">
              {library.hasLibrary ? "Your library" : "Purchased lessons"}
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl tracking-[-0.03em] text-ink">
              {library.hasLibrary ? "Continue learning" : "Lessons you own"}
            </h2>
          </div>
          <Link href="/catalog" className="text-sm font-semibold text-accent-deep hover:underline">
            Open catalog
          </Link>
        </div>

        {library.hasLibrary ? (
          <div className="mt-6 grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {continueLearning.map((item) => (
              <ContentCard key={item.slug} item={item} badge="In library" />
            ))}
          </div>
        ) : library.purchasedLessons.length > 0 ? (
          <div className="mt-6 grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {library.purchasedLessons.map((item) => (
              <ContentCard key={item.slug} item={item} badge="Owned" />
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-[1.4rem] border border-dashed border-[var(--line)] bg-surface px-6 py-12 text-center">
            <p className="font-[family-name:var(--font-display)] text-xl text-ink">
              No lessons unlocked yet
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-ink-soft">
              Preview any lesson free, then unlock a single module or subscribe for the full
              library. Purchases stay on this account.
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

      {!library.hasLibrary && library.purchasedLessons.length > 0 ? (
        <section className="mt-10 rounded-[1.5rem] border border-accent/20 bg-accent/5 px-6 py-8 md:px-8">
          <h2 className="font-[family-name:var(--font-display)] text-2xl tracking-[-0.02em] text-ink">
            Want everything unlocked?
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-soft">
            Your one-time purchases stay yours. A library subscription also opens every other
            lesson in the catalog while membership is active.
          </p>
          <form action={subscribeLibrary} className="mt-5">
            <input type="hidden" name="returnTo" value="/account" />
            <button
              type="submit"
              className="rounded-xl bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition hover:bg-accent-deep"
            >
              Upgrade to library · ${LIBRARY_PRICE_USD}/mo
            </button>
          </form>
        </section>
      ) : null}
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
