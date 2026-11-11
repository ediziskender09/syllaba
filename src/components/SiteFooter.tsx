import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-[var(--line)] bg-ink text-paper">
      <div className="shell grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-accent text-sm font-bold text-paper">
              C
            </span>
            <p className="font-[family-name:var(--font-display)] text-xl tracking-[-0.03em]">
              Syllaba
            </p>
          </div>
          <p className="mt-4 max-w-xs font-[family-name:var(--font-body)] text-sm leading-relaxed text-paper/65">
            A quieter place for deep lessons — structure, practice, and quizzes that
            actually teach.
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-paper/45">
            Product
          </p>
          <div className="mt-3 flex flex-col gap-2 text-sm text-paper/80">
            <Link href="/catalog" className="hover:text-paper">
              Catalog
            </Link>
            <Link href="/pricing" className="hover:text-paper">
              Pricing
            </Link>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-paper/45">
            Company
          </p>
          <div className="mt-3 flex flex-col gap-2 text-sm text-paper/80">
            <Link href="/about" className="hover:text-paper">
              About
            </Link>
            <Link href="/contact" className="hover:text-paper">
              Contact
            </Link>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-paper/45">
            Legal
          </p>
          <div className="mt-3 flex flex-col gap-2 text-sm text-paper/80">
            <Link href="/privacy" className="hover:text-paper">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-paper">
              Terms
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="shell flex flex-col gap-2 py-5 text-xs text-paper/45 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Syllaba</p>
          <p>Educational content for personal learning use.</p>
        </div>
      </div>
    </footer>
  );
}
