"use client";

import { useState } from "react";

export type FaqItem = {
  q: string;
  a: string;
};

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="mx-auto mt-10 grid max-w-3xl gap-2">
      {items.map((item, index) => {
        const open = openIndex === index;
        return (
          <div
            key={item.q}
            className="overflow-hidden rounded-2xl border border-[var(--line)] bg-surface"
          >
            <button
              type="button"
              aria-expanded={open}
              onClick={() => setOpenIndex(open ? null : index)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left md:px-6"
            >
              <span className="font-[family-name:var(--font-display)] text-base tracking-[-0.02em] text-ink md:text-lg">
                {item.q}
              </span>
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[var(--line)] text-sm text-ink-soft transition ${
                  open ? "rotate-45 bg-accent text-paper border-accent" : "bg-paper"
                }`}
              >
                +
              </span>
            </button>
            <div
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="border-t border-[var(--line)] px-5 pb-5 pt-3 font-[family-name:var(--font-body)] text-sm leading-relaxed text-ink-soft md:px-6">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
