import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";

const links = [
  { href: "/catalog", label: "Catalog" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="relative z-20 border-b border-[var(--line)] bg-[rgba(244,240,234,0.9)] backdrop-blur-md">
      <div className="shell flex items-center justify-between gap-6 py-3.5">
        <BrandLogo />

        <nav className="flex items-center gap-0.5 sm:gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hidden rounded-xl px-3 py-2 text-sm font-medium text-ink-soft transition hover:bg-accent/10 hover:text-accent-deep sm:inline-flex"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/catalog"
            className="rounded-xl px-3 py-2 text-sm font-medium text-ink-soft transition hover:bg-accent/10 hover:text-accent-deep sm:hidden"
          >
            Catalog
          </Link>
          <Link
            href="/catalog"
            className="ml-1 rounded-xl bg-ink px-4 py-2 text-sm font-semibold text-paper transition hover:bg-accent-deep"
          >
            Browse lessons
          </Link>
        </nav>
      </div>
    </header>
  );
}
