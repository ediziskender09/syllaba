import Image from "next/image";
import Link from "next/link";
import { auth } from "@/auth";

export async function AuthNav() {
  const session = await auth();

  if (session?.user) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/account"
          className="hidden items-center gap-2 rounded-xl px-2 py-1.5 text-sm font-medium text-ink-soft transition hover:bg-accent/10 hover:text-accent-deep sm:inline-flex"
        >
          {session.user.image ? (
            <Image
              src={session.user.image}
              alt=""
              width={28}
              height={28}
              className="rounded-full"
            />
          ) : (
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-accent/15 text-xs font-semibold text-accent-deep">
              {(session.user.name ?? session.user.email ?? "U")
                .slice(0, 1)
                .toUpperCase()}
            </span>
          )}
          <span className="max-w-[9rem] truncate">
            {session.user.name?.split(" ")[0] ?? "Account"}
          </span>
        </Link>
        <Link
          href="/account"
          className="rounded-xl px-3 py-2 text-sm font-medium text-ink-soft transition hover:bg-accent/10 hover:text-accent-deep sm:hidden"
        >
          Account
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Link
        href="/login"
        className="rounded-xl px-3 py-2 text-sm font-medium text-ink-soft transition hover:bg-accent/10 hover:text-accent-deep"
      >
        Sign in
      </Link>
      <Link
        href="/login?mode=register"
        className="rounded-xl bg-ink px-4 py-2 text-sm font-semibold text-paper transition hover:bg-accent-deep"
      >
        Create account
      </Link>
    </div>
  );
}
