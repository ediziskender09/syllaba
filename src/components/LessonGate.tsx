"use client";

import { useMemo, useState } from "react";
import { QuizPlayer } from "@/components/QuizPlayer";
import type { Quiz } from "@/content/types";

export type LessonSegmentProp =
  | { kind: "html"; html: string }
  | { kind: "quiz"; quiz: Quiz };

type Props = {
  title: string;
  summary: string;
  category: string;
  price: number;
  minutes: number;
  quizCount: number;
  tags: string[];
  outline: string[];
  highlights: string[];
  teaserHtml: string;
  segments: LessonSegmentProp[];
};

export function LessonGate({
  title,
  summary,
  category,
  price,
  minutes,
  quizCount,
  tags,
  outline,
  highlights,
  teaserHtml,
  segments,
}: Props) {
  const [owned, setOwned] = useState(false);
  const [plan, setPlan] = useState<"single" | "subscribe">("single");

  const charge = useMemo(() => (plan === "single" ? price : 12), [plan, price]);

  function buy() {
    setOwned(true);
    window.setTimeout(() => {
      document.getElementById("full-lesson")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 80);
  }

  if (owned) {
    return (
      <article
        id="full-lesson"
        className="mt-6 rounded-[1.6rem] border border-[var(--line)] bg-surface px-6 py-8 shadow-soft md:px-12 md:py-12"
      >
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft/70">
          <span className="rounded-lg bg-accent/10 px-2.5 py-1 text-accent-deep">
            {category}
          </span>
        </div>

        <h1 className="mt-4 max-w-4xl font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3.2rem)] leading-[1.05] tracking-[-0.04em] text-ink">
          {title}
        </h1>
        <p className="mt-4 max-w-3xl font-[family-name:var(--font-body)] text-lg leading-relaxed text-ink-soft">
          {summary}
        </p>

        <div className="mt-10">
          {segments.map((segment, index) =>
            segment.kind === "html" ? (
              <div
                key={`html-${index}`}
                className="prose-learn mx-auto"
                dangerouslySetInnerHTML={{ __html: segment.html }}
              />
            ) : (
              <div key={segment.quiz.id} className="mx-auto max-w-[42rem]">
                <QuizPlayer quiz={segment.quiz} />
              </div>
            ),
          )}
        </div>
      </article>
    );
  }

  return (
    <div className="mt-6 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
      <article className="rounded-[1.6rem] border border-[var(--line)] bg-surface p-6 shadow-soft md:p-10">
        <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft/70">
          <span className="rounded-lg bg-accent/10 px-2.5 py-1 text-accent-deep">
            {category}
          </span>
          <span className="rounded-lg border border-[var(--line)] px-2.5 py-1">
            Preview
          </span>
        </div>

        <h1 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3.2rem)] leading-[1.05] tracking-[-0.04em] text-ink">
          {title}
        </h1>
        <p className="mt-4 max-w-3xl font-[family-name:var(--font-body)] text-lg leading-relaxed text-ink-soft">
          {summary}
        </p>

        <div className="mt-8 space-y-8">
          {highlights.length > 0 ? (
            <section>
              <h2 className="font-[family-name:var(--font-display)] text-2xl tracking-[-0.03em] text-ink">
                You will learn
              </h2>
              <ul className="mt-4 space-y-2">
                {highlights.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2 font-[family-name:var(--font-body)] text-sm leading-relaxed text-ink-soft"
                  >
                    <span className="mt-1 text-accent">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <section>
            <h2 className="font-[family-name:var(--font-display)] text-2xl tracking-[-0.03em] text-ink">
              Table of contents
            </h2>
            <ol className="mt-4 space-y-2">
              {outline.map((heading, index) => (
                <li
                  key={`${index}-${heading}`}
                  className="flex gap-3 border-b border-[var(--line)] px-1 py-2.5 text-sm text-ink-soft last:border-b-0"
                >
                  <span className="w-7 shrink-0 font-semibold text-accent-deep">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{heading}</span>
                </li>
              ))}
            </ol>
          </section>

          {tags.length > 0 ? (
            <section>
              <h2 className="font-[family-name:var(--font-display)] text-2xl tracking-[-0.03em] text-ink">
                Topics covered
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-lg border border-[var(--line)] bg-paper px-3 py-1.5 text-xs font-medium text-ink-soft"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </section>
          ) : null}

          <section>
            <h2 className="font-[family-name:var(--font-display)] text-2xl tracking-[-0.03em] text-ink">
              Free preview
            </h2>
            <p className="mt-2 font-[family-name:var(--font-body)] text-sm text-ink-soft">
              A short opening sample. Unlock to read the full module and take the quizzes.
            </p>
            <div className="relative mt-4 overflow-hidden rounded-2xl border border-[var(--line)]">
              <div
                className="prose-learn max-h-64 overflow-hidden p-5"
                dangerouslySetInnerHTML={{ __html: teaserHtml }}
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-surface to-transparent" />
            </div>
          </section>

          <div className="rounded-2xl border border-accent/20 bg-accent/5 px-5 py-5 lg:hidden">
            <p className="font-[family-name:var(--font-display)] text-xl text-ink">
              Full lesson is locked
            </p>
            <p className="mt-2 font-[family-name:var(--font-body)] text-sm leading-relaxed text-ink-soft">
              Unlock to open the complete lesson, checkpoints, and interactive quizzes.
            </p>
            <button
              type="button"
              onClick={buy}
              className="mt-4 rounded-xl bg-ink px-5 py-3 text-sm font-semibold text-paper transition hover:bg-accent-deep"
            >
              {plan === "single" ? `Unlock for $${charge}` : `Subscribe · $${charge}/mo`}
            </button>
          </div>
        </div>
      </article>

      <aside className="sticky top-6 h-fit rounded-[1.5rem] border border-[var(--line)] bg-ink p-5 text-paper shadow-lift">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-glow">
          Unlock this lesson
        </p>
        <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl leading-tight tracking-[-0.02em]">
          {title}
        </h2>

        <div className="mt-4 space-y-2 font-[family-name:var(--font-body)] text-sm text-paper/70">
          <p>~{minutes} min to study</p>
          {quizCount > 0 ? <p>{quizCount} interactive quizzes included</p> : null}
          <p>Buy once, or subscribe for the full library</p>
        </div>

        <div className="mt-4 space-y-2">
          <button
            type="button"
            onClick={() => setPlan("single")}
            className={`flex w-full items-center justify-between rounded-xl border px-3 py-3 text-left transition ${
              plan === "single"
                ? "border-glow/50 bg-glow/15"
                : "border-white/10 bg-white/5 hover:bg-white/8"
            }`}
          >
            <span>
              <span className="block text-sm font-semibold">This lesson</span>
              <span className="text-xs text-paper/55">One-time unlock</span>
            </span>
            <span className="text-lg font-semibold">${price}</span>
          </button>

          <button
            type="button"
            onClick={() => setPlan("subscribe")}
            className={`flex w-full items-center justify-between rounded-xl border px-3 py-3 text-left transition ${
              plan === "subscribe"
                ? "border-glow/50 bg-glow/15"
                : "border-white/10 bg-white/5 hover:bg-white/8"
            }`}
          >
            <span>
              <span className="block text-sm font-semibold">Library subscription</span>
              <span className="text-xs text-paper/55">All lessons, cancel anytime</span>
            </span>
            <span className="text-lg font-semibold">
              $12<span className="text-xs font-medium text-paper/55">/mo</span>
            </span>
          </button>
        </div>

        <button
          type="button"
          onClick={buy}
          className="mt-4 w-full rounded-xl bg-accent px-4 py-3 text-sm font-bold text-paper transition hover:bg-accent-deep"
        >
          {plan === "single" ? `Unlock for $${charge}` : `Subscribe · $${charge}/mo`}
        </button>
      </aside>
    </div>
  );
}
