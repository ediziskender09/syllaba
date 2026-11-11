"use client";

import { useMemo, useState } from "react";
import type { Quiz } from "@/content/types";

type Props = {
  quiz: Quiz;
};

type AnswerMap = Record<string, string>;

export function QuizPlayer({ quiz }: Props) {
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [submitted, setSubmitted] = useState(false);

  const score = useMemo(() => {
    if (!submitted) return null;
    let correct = 0;
    for (const question of quiz.questions) {
      if (answers[question.id] === question.correctOptionId) correct += 1;
    }
    return { correct, total: quiz.questions.length };
  }, [answers, quiz.questions, submitted]);

  function selectAnswer(questionId: string, optionId: string) {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  }

  function submit() {
    if (Object.keys(answers).length < quiz.questions.length) return;
    setSubmitted(true);
  }

  function reset() {
    setAnswers({});
    setSubmitted(false);
  }

  const allAnswered = Object.keys(answers).length === quiz.questions.length;

  return (
    <section className="my-10 overflow-hidden rounded-[1.4rem] border border-accent/20 bg-accent/[0.04]">
      <div className="border-b border-accent/15 bg-accent/10 px-5 py-4 md:px-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent-deep">
          Interactive quiz
        </p>
        <h3 className="mt-1 font-[family-name:var(--font-display)] text-2xl tracking-[-0.02em] text-ink">
          {quiz.title}
        </h3>
        {quiz.intro ? (
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">{quiz.intro}</p>
        ) : null}
      </div>

      <div className="space-y-6 px-5 py-5 md:px-6">
        {quiz.questions.map((question, index) => {
          const selected = answers[question.id];
          const isCorrect = selected === question.correctOptionId;
          const correctOption = question.options.find(
            (option) => option.id === question.correctOptionId,
          );

          return (
            <div
              key={question.id}
              className="rounded-2xl border border-[var(--line)] bg-surface p-4 md:p-5"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft/60">
                Question {index + 1}
              </p>
              <p className="mt-2 text-base font-semibold leading-snug text-ink">
                {question.prompt}
              </p>

              <div className="mt-4 space-y-2">
                {question.options.map((option) => {
                  const chosen = selected === option.id;
                  const showCorrect =
                    submitted && option.id === question.correctOptionId;
                  const showWrong =
                    submitted && chosen && option.id !== question.correctOptionId;

                  let styles =
                    "border-[var(--line)] bg-paper hover:border-accent/40";
                  if (!submitted && chosen) {
                    styles = "border-accent bg-accent/10";
                  }
                  if (showCorrect) {
                    styles = "border-accent bg-accent/15";
                  }
                  if (showWrong) {
                    styles = "border-red-400 bg-red-50";
                  }

                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => selectAnswer(question.id, option.id)}
                      disabled={submitted}
                      className={`flex w-full items-start gap-3 rounded-xl border px-3 py-3 text-left text-sm transition ${styles} ${
                        submitted ? "cursor-default" : "cursor-pointer"
                      }`}
                    >
                      <span
                        className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[11px] font-bold ${
                          showCorrect
                            ? "border-accent bg-accent text-paper"
                            : showWrong
                              ? "border-red-400 bg-red-400 text-white"
                              : chosen
                                ? "border-accent bg-accent text-paper"
                                : "border-[var(--line)] text-ink-soft"
                        }`}
                      >
                        {option.id.toUpperCase()}
                      </span>
                      <span className="leading-relaxed text-ink-soft">
                        {option.text}
                      </span>
                    </button>
                  );
                })}
              </div>

              {submitted && selected ? (
                <div
                  className={`mt-4 rounded-xl px-3 py-3 text-sm leading-relaxed ${
                    isCorrect
                      ? "bg-accent/10 text-accent-deep"
                      : "bg-red-50 text-red-900"
                  }`}
                >
                  <p className="font-semibold">
                    {isCorrect ? "Correct" : "Incorrect"}
                  </p>
                  {!isCorrect ? (
                    <p className="mt-1">
                      {question.wrongExplanations?.[selected] ??
                        `The correct answer is ${correctOption?.id.toUpperCase()}: ${correctOption?.text}`}
                    </p>
                  ) : null}
                  <p className="mt-2 text-ink-soft">
                    <span className="font-semibold text-ink">Why: </span>
                    {question.explanation}
                  </p>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-accent/15 px-5 py-4 md:px-6">
        {submitted && score ? (
          <p className="text-sm font-semibold text-ink">
            Score: {score.correct}/{score.total}
            {score.correct === score.total
              ? " — excellent."
              : " — review the explanations above, then retry."}
          </p>
        ) : (
          <p className="text-sm text-ink-soft">
            Select an answer for every question, then check your work.
          </p>
        )}

        <div className="flex gap-2">
          {submitted ? (
            <button
              type="button"
              onClick={reset}
              className="rounded-xl border border-[var(--line)] bg-paper px-4 py-2 text-sm font-semibold text-ink"
            >
              Try again
            </button>
          ) : (
            <button
              type="button"
              onClick={submit}
              disabled={!allAnswered}
              className="rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-paper disabled:cursor-not-allowed disabled:opacity-40"
            >
              Check answers
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
