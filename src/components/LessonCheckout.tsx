"use client";

import Link from "next/link";
import { useState } from "react";
import { subscribeLibrary, unlockLesson } from "@/lib/commerce-actions";
import { LIBRARY_PRICE_USD } from "@/lib/commerce";
import type { Quiz } from "@/content/types";

export type LessonSegmentProp =
  | { kind: "html"; html: string }
  | { kind: "quiz"; quiz: Quiz };

type Props = {
  slug: string;
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
  signedIn: boolean;
};

export function LessonCheckout({
  slug,
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
  signedIn,
}: Props) {
  const [plan, setPlan] = useState<"single" | "subscribe">("subscribe");
  const loginHref = `/login?callbackUrl=${encodeURIComponent(`/learn/${slug}`)}`;

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
            <MobileUnlock
              slug={slug}
              plan={plan}
              setPlan={setPlan}
              price={price}
              signedIn={signedIn}
              loginHref={loginHref}
            />
          </div>
        </div>
      </article>

      <aside className="sticky top-6 hidden h-fit rounded-[1.5rem] border border-[var(--line)] bg-ink p-5 text-paper shadow-lift lg:block">
        <UnlockPanel
          slug={slug}
          title={title}
          plan={plan}
          setPlan={setPlan}
          price={price}
          minutes={minutes}
          quizCount={quizCount}
          signedIn={signedIn}
          loginHref={loginHref}
        />
      </aside>
    </div>
  );
}

function MobileUnlock({
  slug,
  plan,
  setPlan,
  price,
  signedIn,
  loginHref,
}: {
  slug: string;
  plan: "single" | "subscribe";
  setPlan: (plan: "single" | "subscribe") => void;
  price: number;
  signedIn: boolean;
  loginHref: string;
}) {
  return (
    <div>
      <p className="font-[family-name:var(--font-display)] text-xl text-ink">
        Full lesson is locked
      </p>
      <p className="mt-2 font-[family-name:var(--font-body)] text-sm leading-relaxed text-ink-soft">
        Sign in and unlock to open the complete lesson, checkpoints, and quizzes. Access stays
        on your account.
      </p>
      <div className="mt-4 grid gap-2">
        <button
          type="button"
          onClick={() => setPlan("subscribe")}
          className={`rounded-xl border px-3 py-2 text-left text-sm ${
            plan === "subscribe"
              ? "border-accent bg-accent/10 text-ink"
              : "border-[var(--line)] text-ink-soft"
          }`}
        >
          Library · ${LIBRARY_PRICE_USD}/mo
        </button>
        <button
          type="button"
          onClick={() => setPlan("single")}
          className={`rounded-xl border px-3 py-2 text-left text-sm ${
            plan === "single"
              ? "border-accent bg-accent/10 text-ink"
              : "border-[var(--line)] text-ink-soft"
          }`}
        >
          This lesson · ${price}
        </button>
      </div>
      <CheckoutButton
        className="mt-4 rounded-xl bg-ink px-5 py-3 text-sm font-semibold text-paper transition hover:bg-accent-deep"
        slug={slug}
        plan={plan}
        price={price}
        signedIn={signedIn}
        loginHref={loginHref}
      />
    </div>
  );
}

function UnlockPanel({
  slug,
  title,
  plan,
  setPlan,
  price,
  minutes,
  quizCount,
  signedIn,
  loginHref,
}: {
  slug: string;
  title: string;
  plan: "single" | "subscribe";
  setPlan: (plan: "single" | "subscribe") => void;
  price: number;
  minutes: number;
  quizCount: number;
  signedIn: boolean;
  loginHref: string;
}) {
  return (
    <>
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-glow">
        Unlock this lesson
      </p>
      <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl leading-tight tracking-[-0.02em]">
        {title}
      </h2>

      <div className="mt-4 space-y-2 font-[family-name:var(--font-body)] text-sm text-paper/70">
        <p>~{minutes} min to study</p>
        {quizCount > 0 ? <p>{quizCount} interactive quizzes included</p> : null}
        <p>Access is saved to your account — it won&apos;t disappear on refresh.</p>
      </div>

      <div className="mt-4 space-y-2">
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
            ${LIBRARY_PRICE_USD}
            <span className="text-xs font-medium text-paper/55">/mo</span>
          </span>
        </button>

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
      </div>

      <CheckoutButton
        className="mt-4 w-full rounded-xl bg-accent px-4 py-3 text-sm font-bold text-paper transition hover:bg-accent-deep"
        slug={slug}
        plan={plan}
        price={price}
        signedIn={signedIn}
        loginHref={loginHref}
      />

      {!signedIn ? (
        <p className="mt-3 text-center text-xs text-paper/55">
          <Link href={loginHref} className="underline hover:text-paper">
            Sign in
          </Link>{" "}
          required before unlock
        </p>
      ) : null}
    </>
  );
}

function CheckoutButton({
  className,
  slug,
  plan,
  price,
  signedIn,
  loginHref,
}: {
  className: string;
  slug: string;
  plan: "single" | "subscribe";
  price: number;
  signedIn: boolean;
  loginHref: string;
}) {
  const label =
    plan === "single"
      ? `Unlock for $${price}`
      : `Subscribe · $${LIBRARY_PRICE_USD}/mo`;

  if (!signedIn) {
    return (
      <Link href={loginHref} className={`${className} inline-flex justify-center`}>
        Sign in to {plan === "single" ? "unlock" : "subscribe"}
      </Link>
    );
  }

  if (plan === "subscribe") {
    return (
      <form action={subscribeLibrary}>
        <input type="hidden" name="returnTo" value={`/learn/${slug}`} />
        <button type="submit" className={className}>
          {label}
        </button>
      </form>
    );
  }

  return (
    <form action={unlockLesson}>
      <input type="hidden" name="slug" value={slug} />
      <button type="submit" className={className}>
        {label}
      </button>
    </form>
  );
}
