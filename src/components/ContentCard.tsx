import Link from "next/link";
import type { ContentMeta } from "@/content/types";

export function ContentCard({ item }: { item: ContentMeta }) {
  return (
    <Link
      href={`/learn/${item.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[1.4rem] border border-[var(--line)] bg-surface shadow-soft transition duration-300 hover:-translate-y-0.5 hover:border-accent/25 hover:shadow-lift"
    >
      <div className="h-1.5 w-full bg-gradient-to-r from-accent via-accent/70 to-glow/80" />
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-lg bg-accent/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-accent-deep">
            {item.category}
          </span>
          <span className="text-sm font-semibold text-ink">${item.price}</span>
        </div>

        <h3 className="mt-4 font-[family-name:var(--font-display)] text-[1.28rem] leading-tight tracking-[-0.02em] text-ink transition group-hover:text-accent-deep">
          {item.title}
        </h3>

        <p className="mt-3 flex-1 font-[family-name:var(--font-body)] text-sm leading-relaxed text-ink-soft">
          {item.summary}
        </p>

        <div className="mt-5 flex items-center justify-between text-xs text-ink-soft">
          <span>
            {item.quizCount && item.quizCount > 0
              ? `${item.quizCount} quizzes`
              : "Full lesson"}
          </span>
          <span className="font-medium text-accent-deep transition group-hover:underline">
            View lesson →
          </span>
        </div>
      </div>
    </Link>
  );
}
