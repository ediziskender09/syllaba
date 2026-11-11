import type { Metadata } from "next";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://getsyllaba.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Syllaba — Lessons worth sitting with",
    template: "%s · Syllaba",
  },
  description:
    "Warm, structured lessons with worked examples and interactive quizzes across AI, programming, data, business, and creative skills.",
  openGraph: {
    title: "Syllaba",
    description:
      "Deep lessons built to study end to end — with previews, unlocks, and interactive quizzes.",
    url: siteUrl,
    siteName: "Syllaba",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Syllaba",
    description:
      "Deep lessons built to study end to end — with previews, unlocks, and interactive quizzes.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="relative z-10 flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
