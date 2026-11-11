"use server";

import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { z } from "zod";
import { signIn } from "@/auth";
import { issueEmailVerification } from "@/lib/email-verification";
import { prisma } from "@/lib/prisma";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.string().min(1).max(80).optional(),
});

export type AuthFormState = {
  ok: boolean;
  error?: string;
  message?: string;
  needsVerification?: boolean;
};

export async function registerWithEmail(
  _prev: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const parsed = credentialsSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    name: formData.get("name") || undefined,
  });

  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const email = parsed.data.email.toLowerCase().trim();
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { ok: false, error: "An account with this email already exists." };
  }

  const hashedPassword = await bcrypt.hash(parsed.data.password, 12);
  await prisma.user.create({
    data: {
      email,
      name: parsed.data.name?.trim() || email.split("@")[0],
      hashedPassword,
    },
  });

  try {
    await issueEmailVerification(email);
  } catch {
    return {
      ok: false,
      error:
        "Account created, but we couldn't send the verification email. Try again from sign in.",
    };
  }

  redirect(`/login?checkEmail=1&email=${encodeURIComponent(email)}`);
}

export async function loginWithEmail(
  _prev: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const parsed = credentialsSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { ok: false, error: "Enter a valid email and password." };
  }

  const email = parsed.data.email.toLowerCase().trim();
  const user = await prisma.user.findUnique({ where: { email } });

  if (user?.hashedPassword && !user.emailVerified) {
    return {
      ok: false,
      needsVerification: true,
      error: "Verify your email first. Check your inbox for the link.",
    };
  }

  try {
    await signIn("credentials", {
      email,
      password: parsed.data.password,
      redirectTo: "/account",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { ok: false, error: "Invalid email or password." };
    }
    throw error;
  }

  return { ok: true };
}

export async function resendVerificationEmail(
  _prev: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const email = String(formData.get("email") || "")
    .toLowerCase()
    .trim();

  if (!z.string().email().safeParse(email).success) {
    return { ok: false, error: "Enter a valid email address." };
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user?.hashedPassword) {
    return {
      ok: true,
      message: "If an unverified account exists for that email, we sent a new link.",
    };
  }

  if (user.emailVerified) {
    return { ok: true, message: "This email is already verified. You can sign in." };
  }

  try {
    await issueEmailVerification(email);
  } catch {
    return { ok: false, error: "Couldn't send the email right now. Try again shortly." };
  }

  return { ok: true, message: "Verification email sent. Check your inbox." };
}
