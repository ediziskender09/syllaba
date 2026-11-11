import { NextResponse } from "next/server";
import { auth } from "@/auth";

export default auth((req) => {
  if (!req.auth && req.nextUrl.pathname.startsWith("/account")) {
    const url = new URL("/login", req.nextUrl.origin);
    url.searchParams.set("callbackUrl", "/account");
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
});

export const config = {
  matcher: ["/account"],
};
