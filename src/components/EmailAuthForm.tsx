"use client";

import { useActionState } from "react";
import {
  loginWithEmail,
  registerWithEmail,
  type AuthFormState,
} from "@/lib/auth-actions";

const initial: AuthFormState = { ok: false };

export function EmailAuthForm({ mode }: { mode: "login" | "register" }) {
  const action = mode === "register" ? registerWithEmail : loginWithEmail;
  const [state, formAction, pending] = useActionState(action, initial);

  return (
    <form action={formAction} className="space-y-3">
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
        placeholder="Email"
        autoComplete="email"
        className="w-full rounded-xl border border-[var(--line)] bg-paper px-4 py-3 text-sm outline-none ring-accent/30 focus:ring-2"
      />
      <input
        name="password"
        type="password"
        required
        minLength={8}
        placeholder="Password (min 8 characters)"
        autoComplete={mode === "register" ? "new-password" : "current-password"}
        className="w-full rounded-xl border border-[var(--line)] bg-paper px-4 py-3 text-sm outline-none ring-accent/30 focus:ring-2"
      />

      {state.error ? (
        <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
          {state.error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-xl bg-ink px-4 py-3 text-sm font-semibold text-paper transition hover:bg-accent-deep disabled:opacity-60"
      >
        {pending
          ? "Please wait..."
          : mode === "register"
            ? "Create account"
            : "Sign in with email"}
      </button>
    </form>
  );
}
