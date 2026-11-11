import Link from "next/link";
import { redirect } from "next/navigation";
import { BrandLogo } from "@/components/BrandLogo";
import { EmailAuthForm } from "@/components/EmailAuthForm";
import { auth, signIn } from "@/auth";

export const metadata = {
  title: "Sign in",
  description: "Sign in or create your Syllaba account with email or Google.",
};

type Props = {
  searchParams: Promise<{ callbackUrl?: string; error?: string; mode?: string }>;
};

export default async function LoginPage({ searchParams }: Props) {
  const session = await auth();
  const params = await searchParams;
  const callbackUrl = params.callbackUrl || "/account";
  const mode = params.mode === "register" ? "register" : "login";

  if (session?.user) {
    redirect("/account");
  }

  return (
    <div className="shell flex min-h-[70vh] items-center justify-center py-14">
      <div className="w-full max-w-md rounded-[1.6rem] border border-[var(--line)] bg-surface p-8 shadow-soft md:p-10">
        <div className="flex justify-center">
          <BrandLogo href="/" showWordmark />
        </div>

        <h1 className="mt-8 text-center font-[family-name:var(--font-display)] text-3xl tracking-[-0.03em] text-ink">
          {mode === "register" ? "Create your account" : "Sign in to Syllaba"}
        </h1>
        <p className="mt-3 text-center font-[family-name:var(--font-body)] text-sm leading-relaxed text-ink-soft">
          Use email and password, or continue with Google. Purchases will attach to
          this account.
        </p>

        <div className="mt-6 grid grid-cols-2 gap-2 rounded-xl bg-paper p-1">
          <Link
            href="/login"
            className={`rounded-lg px-3 py-2 text-center text-sm font-semibold ${
              mode === "login" ? "bg-surface text-ink shadow-soft" : "text-ink-soft"
            }`}
          >
            Sign in
          </Link>
          <Link
            href="/login?mode=register"
            className={`rounded-lg px-3 py-2 text-center text-sm font-semibold ${
              mode === "register" ? "bg-surface text-ink shadow-soft" : "text-ink-soft"
            }`}
          >
            Create account
          </Link>
        </div>

        {params.error ? (
          <p className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-center text-sm text-red-800">
            Sign-in failed. Try again.
          </p>
        ) : null}

        <div className="mt-6">
          <EmailAuthForm mode={mode} />
        </div>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-[var(--line)]" />
          <span className="text-xs uppercase tracking-[0.14em] text-ink-soft/60">or</span>
          <div className="h-px flex-1 bg-[var(--line)]" />
        </div>

        <form
          action={async () => {
            "use server";
            await signIn("google", { redirectTo: callbackUrl });
          }}
        >
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-[var(--line)] bg-paper px-4 py-3.5 text-sm font-semibold text-ink transition hover:border-accent/35 hover:bg-surface"
          >
            <GoogleIcon />
            Continue with Google
          </button>
        </form>

        <p className="mt-6 text-center text-xs leading-relaxed text-ink-soft/80">
          By continuing you agree to our{" "}
          <Link href="/terms" className="underline hover:text-ink">
            Terms
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline hover:text-ink">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 8 3.1l5.7-5.7C34.2 6.1 29.4 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.7 16.1 19 13 24 13c3.1 0 5.8 1.2 8 3.1l5.7-5.7C34.2 6.1 29.4 4 24 4 16.3 4 9.6 8.3 6.3 14.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.2 0 10-2 13.6-5.2l-6.3-5.2C29.3 35.9 26.8 37 24 37c-5.3 0-9.7-3.1-11.3-7.5l-6.5 5C9.5 39.6 16.2 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.2-4.2 5.6l.1.1 6.3 5.2C39.1 37.1 44 32 44 24c0-1.3-.1-2.7-.4-3.5z"
      />
    </svg>
  );
}
