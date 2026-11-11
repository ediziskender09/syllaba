"use client";

import { useActionState, useState } from "react";
import {
  loginWithEmail,
  registerWithEmail,
  resendVerificationEmail,
  type AuthFormState,
} from "@/lib/auth-actions";

const initial: AuthFormState = { ok: false };

export function EmailAuthForm({
  mode,
  initialEmail = "",
}: {
  mode: "login" | "register";
  initialEmail?: string;
}) {
  const action = mode === "register" ? registerWithEmail : loginWithEmail;
  const [state, formAction, pending] = useActionState(action, initial);
  const [resendState, resendAction, resendPending] = useActionState(
    resendVerificationEmail,
    initial,
  );
  const [email, setEmail] = useState(initialEmail);
  const showResend = Boolean(state.needsVerification || resendState.message || resendState.error);

  return (
    <div className="space-y-3">
      <form action={formAction} className="space-y-3" autoComplete={mode === "login" ? "on" : "on"}>
        {mode === "register" ? (
          <input
            name="name"
            type="text"
            placeholder="Name"
            autoComplete="name"
            className="w-full rounded-xl border border-[var(--line)] bg-paper px-4 py-3 text-sm outline-none ring-accent/30 focus:ring-2"
          />
        ) : null}
        <input
          name="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          autoComplete="username"
          className="w-full rounded-xl border border-[var(--line)] bg-paper px-4 py-3 text-sm outline-none ring-accent/30 focus:ring-2"
        />
        <input
          name="password"
          type="password"
          required
          minLength={mode === "register" ? 6 : undefined}
          placeholder={mode === "register" ? "Password (min 6 characters)" : "Password"}
          autoComplete={mode === "register" ? "new-password" : "current-password"}
          className="w-full rounded-xl border border-[var(--line)] bg-paper px-4 py-3 text-sm outline-none ring-accent/30 focus:ring-2"
        />

        {state.error ? (
          <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
            {state.error}
          </p>
        ) : null}

        {state.message ? (
          <p className="rounded-xl border border-accent/25 bg-accent/10 px-3 py-2 text-sm text-accent-deep">
            {state.message}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-xl bg-ink px-4 py-3 text-sm font-semibold text-paper transition hover:bg-accent-deep disabled:opacity-60"
        >
          {pending
            ? mode === "register"
              ? "Sending verification..."
              : "Please wait..."
            : mode === "register"
              ? "Create account"
              : "Sign in with email"}
        </button>
      </form>

      {mode === "login" && showResend ? (
        <form action={resendAction} className="pt-1">
          <input type="hidden" name="email" value={email} />
          {resendState.error ? (
            <p className="mb-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
              {resendState.error}
            </p>
          ) : null}
          {resendState.message ? (
            <p className="mb-2 rounded-xl border border-accent/25 bg-accent/10 px-3 py-2 text-sm text-accent-deep">
              {resendState.message}
            </p>
          ) : null}
          <button
            type="submit"
            disabled={resendPending || !email}
            className="w-full text-center text-xs font-medium text-ink-soft underline-offset-2 hover:text-ink hover:underline disabled:opacity-50"
          >
            {resendPending ? "Sending..." : "Resend verification email"}
          </button>
        </form>
      ) : null}
    </div>
  );
}
