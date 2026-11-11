import { AuthError } from "next-auth";
import { NextResponse } from "next/server";
import { signIn } from "@/auth";
import { consumeEmailVerification } from "@/lib/email-verification";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token")?.trim();
  const email = url.searchParams.get("email")?.trim().toLowerCase();
  const loginUrl = new URL("/login", url.origin);

  if (!token || !email) {
    loginUrl.searchParams.set("verifyError", "missing");
    return NextResponse.redirect(loginUrl);
  }

  const result = await consumeEmailVerification(email, token);

  if (!result.ok) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (user?.emailVerified) {
      loginUrl.searchParams.set("verified", "1");
      loginUrl.searchParams.set("email", email);
      return NextResponse.redirect(loginUrl);
    }
    loginUrl.searchParams.set("verifyError", "invalid");
    return NextResponse.redirect(loginUrl);
  }

  try {
    await signIn("credentials", {
      email: result.email,
      loginToken: result.loginToken,
      redirectTo: "/account",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      loginUrl.searchParams.set("verified", "1");
      loginUrl.searchParams.set("email", result.email);
      return NextResponse.redirect(loginUrl);
    }
    throw error;
  }

  loginUrl.searchParams.set("verified", "1");
  loginUrl.searchParams.set("email", result.email);
  return NextResponse.redirect(loginUrl);
}
