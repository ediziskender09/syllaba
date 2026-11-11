import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { consumeEmailVerification } from "@/lib/email-verification";

export const metadata = {
  title: "Verify email",
  description: "Confirm your Syllaba email address.",
};

type Props = {
  searchParams: Promise<{ token?: string; email?: string }>;
};

export default async function VerifyEmailPage({ searchParams }: Props) {
  const params = await searchParams;
  const token = params.token?.trim();
  const email = params.email?.trim();

  let result:
    | { ok: true }
    | { ok: false; error: string } = {
    ok: false,
    error: "Missing verification details. Open the link from your email.",
  };

  if (token && email) {
    result = await consumeEmailVerification(email, token);
  }

  return (
    <div className="shell flex min-h-[70vh] items-center justify-center py-14">
      <div className="w-full max-w-md rounded-[1.6rem] border border-[var(--line)] bg-surface p-8 text-center shadow-soft md:p-10">
        <div className="flex justify-center">
          <BrandLogo href="/" showWordmark />
        </div>

        <h1 className="mt-8 font-[family-name:var(--font-display)] text-3xl tracking-[-0.03em] text-ink">
          {result.ok ? "Email verified" : "Verification failed"}
        </h1>
        <p className="mt-3 font-[family-name:var(--font-body)] text-sm leading-relaxed text-ink-soft">
          {result.ok
            ? "Your email is confirmed. You can sign in with your password."
            : result.error}
        </p>

        <Link
          href="/login"
          className="mt-8 inline-flex rounded-xl bg-ink px-5 py-3 text-sm font-semibold text-paper transition hover:bg-accent-deep"
        >
          {result.ok ? "Sign in" : "Back to sign in"}
        </Link>
      </div>
    </div>
  );
}
