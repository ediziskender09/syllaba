import { QuizPlayer } from "@/components/QuizPlayer";
import type { LessonSegmentProp } from "@/components/LessonCheckout";

type Props = {
  title: string;
  summary: string;
  category: string;
  accessLabel: string;
  segments: LessonSegmentProp[];
};

export function LessonContent({
  title,
  summary,
  category,
  accessLabel,
  segments,
}: Props) {
  return (
    <article
      id="full-lesson"
      className="mt-6 rounded-[1.6rem] border border-[var(--line)] bg-surface px-6 py-8 shadow-soft md:px-12 md:py-12"
    >
      <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft/70">
        <span className="rounded-lg bg-accent/10 px-2.5 py-1 text-accent-deep">
          {category}
        </span>
        <span className="rounded-lg border border-accent/25 bg-accent/5 px-2.5 py-1 text-accent-deep">
          {accessLabel}
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
