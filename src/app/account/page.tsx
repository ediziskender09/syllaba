import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth, signOut } from "@/auth";

export const metadata = {
  title: "Account",
  description: "Your Syllaba account.",
};

export default async function AccountPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login?callbackUrl=/account");
  }

  const user = session.user;

  return (
    <div className="shell py-10 md:py-14">
      <div className="mx-auto max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-soft/60">
          Account
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl tracking-[-0.04em] text-ink">
          Your Syllaba account
        </h1>

        <div className="mt-8 rounded-[1.5rem] border border-[var(--line)] bg-surface p-6 shadow-soft md:p-8">
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

          <div className="mt-8 grid gap-3 border-t border-[var(--line)] pt-6 text-sm text-ink-soft">
            <p>
              Signed in with <span className="font-semibold text-ink">Google</span>.
            </p>
            <p>
              Purchases and library subscription will appear here once payments are
              connected.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/catalog"
              className="rounded-xl bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition hover:bg-accent-deep"
            >
              Browse lessons
            </Link>
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}
            >
              <button
                type="submit"
                className="rounded-xl border border-[var(--line)] bg-paper px-5 py-2.5 text-sm font-semibold text-ink transition hover:border-accent/30"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
