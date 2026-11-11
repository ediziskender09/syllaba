"use client";

import { useState } from "react";

const stages = [
  {
    id: "outcomes",
    label: "Outcomes",
    title: "What you will be able to do",
    body: "Every module opens with clear outcomes so you know the destination before you start reading.",
  },
  {
    id: "ideas",
    label: "Core ideas",
    title: "Ideas explained in sequence",
    body: "Concepts build step by step with plain language, definitions, and the judgment behind the technique.",
  },
  {
    id: "examples",
    label: "Worked examples",
    title: "See the work, not just the tip",
    body: "Real examples walk through decisions, mistakes, and better approaches you can reuse immediately.",
  },
  {
    id: "quizzes",
    label: "Quiz checkpoints",
    title: "Practice that teaches",
    body: "Interactive quizzes mark answers and explain wrong choices so mistakes become part of the lesson.",
  },
] as const;

type Props = {
  category?: string;
  title?: string;
};

export function HeroPreview({ category, title }: Props) {
  const [activeId, setActiveId] = useState<(typeof stages)[number]["id"]>("ideas");
  const active = stages.find((stage) => stage.id === activeId) ?? stages[1];

  return (
    <div className="soft-float relative hidden min-h-[30rem] md:block">
      <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-glow/30 via-transparent to-accent/20 blur-sm" />
      <div className="absolute inset-0 overflow-hidden rounded-[1.75rem] border border-white/40 bg-ink shadow-lift">
        <div className="flex h-11 items-center justify-between border-b border-white/10 px-5">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-glow/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          </div>
          <span className="text-xs tracking-wide text-white/40">Hover a stage</span>
        </div>
        <div className="grid h-[calc(100%-2.75rem)] grid-cols-[0.85fr_1.15fr]">
          <div className="border-r border-white/8 bg-[#241f1b] p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-glow/80">
              Outline
            </p>
            <ul className="mt-5 space-y-2">
              {stages.map((stage) => {
                const isActive = stage.id === activeId;
                return (
                  <li key={stage.id}>
                    <button
                      type="button"
                      onMouseEnter={() => setActiveId(stage.id)}
                      onFocus={() => setActiveId(stage.id)}
                      className={`w-full rounded-lg px-3 py-2.5 text-left text-sm transition ${
                        isActive
                          ? "bg-accent/25 text-paper"
                          : "text-paper/50 hover:bg-white/5 hover:text-paper/80"
                      }`}
                    >
                      {stage.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="bg-gradient-to-b from-[#2a241f] to-[#1c1916] p-6 text-paper">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-glow">
              {category ?? "Inside a lesson"}
            </p>
            <p className="mt-3 font-[family-name:var(--font-display)] text-2xl leading-tight tracking-[-0.03em]">
              {active.title}
            </p>
            <p className="mt-4 font-[family-name:var(--font-body)] text-sm leading-relaxed text-paper/65">
              {active.body}
            </p>
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs font-semibold text-paper/80">
                {title ?? "Syllaba lesson format"}
              </p>
              <p className="mt-2 font-[family-name:var(--font-body)] text-xs leading-relaxed text-paper/45">
                Preview free · unlock the full module · keep access after purchase
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
