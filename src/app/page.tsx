import Link from "next/link";
import { ContentCard } from "@/components/ContentCard";
import { FaqAccordion } from "@/components/FaqAccordion";
import { HeroPreview } from "@/components/HeroPreview";
import { getAllContentMeta, getCategories, getFeaturedContent } from "@/lib/content";

const faqItems = [
  {
    q: "Can I preview before paying?",
    a: "Yes. Every lesson opens with learning outcomes, a table of contents, and a free sample of the opening sections so you can judge the teaching quality first.",
  },
  {
    q: "What do I get after unlock?",
    a: "You get the complete long-form lesson plus interactive quizzes. Wrong answers include explanations, so practice reinforces the material instead of just scoring you.",
  },
  {
    q: "Is this short AI chat content?",
    a: "No. Syllaba modules are written as study-ready lessons with structure, examples, checkpoints, and enough depth to finish with real understanding.",
  },
  {
    q: "Do I keep access after purchase?",
    a: "Single-lesson buys stay unlocked after purchase. The library subscription keeps the full catalog open while your membership is active.",
  },
  {
    q: "What is the library subscription?",
    a: "One monthly subscription unlocks the full Syllaba library — every current lesson, plus new lessons added while you stay subscribed. Cancel anytime.",
  },
  {
    q: "Are refunds available?",
    a: "If a purchase fails to unlock content or there is a clear delivery issue, contact support and we will fix access or arrange a refund. Once a lesson has been unlocked and studied, refunds are reviewed case by case.",
  },
  {
    q: "Who is Syllaba for?",
    a: "People who want deeper learning than a quick tip or chat reply — career switchers, working professionals, and self-taught learners who prefer structured study.",
  },
  {
    q: "How often do you add lessons?",
    a: "New modules are added regularly across high-demand skills. The catalog grows over time, and featured lessons highlight strong starting points.",
  },
];

export default function HomePage() {
  const featured = getFeaturedContent();
  const all = getAllContentMeta();
  const categories = getCategories();
  const showcase = (featured.length ? featured : all).slice(0, 6);
  const spotlight = showcase[0];

  return (
    <div>
      <section className="relative overflow-hidden border-b border-[var(--line)]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-glow/25 blur-3xl" />
          <div className="absolute -right-10 top-0 h-[28rem] w-[28rem] rounded-full bg-accent/15 blur-3xl" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-paper to-transparent" />
        </div>

        <div className="shell relative grid min-h-[86vh] items-center gap-12 py-14 md:grid-cols-[1.05fr_0.95fr] md:gap-14 md:py-20">
          <div className="rise max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent-deep">
              Deep study, not skim culture
            </p>
            <p className="mt-4 font-[family-name:var(--font-display)] text-[clamp(3rem,7vw,4.6rem)] leading-none tracking-[-0.05em] text-ink">
              Syllaba
            </p>
            <h1 className="mt-5 font-[family-name:var(--font-display)] text-[clamp(1.9rem,3.8vw,2.85rem)] leading-[1.08] tracking-[-0.035em] text-ink">
              Lessons worth sitting with.
            </h1>
            <p className="mt-5 max-w-md font-[family-name:var(--font-body)] text-lg leading-relaxed text-ink-soft">
              Long-form modules with worked examples and quizzes that explain every wrong
              answer — written to finish, not skim.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/catalog"
                className="rounded-xl bg-ink px-6 py-3 text-sm font-semibold text-paper shadow-soft transition hover:bg-accent-deep"
              >
                Explore catalog
              </Link>
              <Link
                href="/pricing"
                className="rounded-xl border border-[var(--line)] bg-surface/80 px-6 py-3 text-sm font-semibold text-ink transition hover:border-accent/35"
              >
                View pricing
              </Link>
            </div>
          </div>

          <HeroPreview category={spotlight?.category} title={spotlight?.title} />
        </div>
      </section>

      <section className="border-b border-[var(--line)] bg-surface/70">
        <div className="shell fade grid gap-6 py-10 md:grid-cols-3 md:gap-8 md:py-12">
          {[
            "No fluff dashboards — just lessons built to study.",
            "Wrong answers come with explanations, not silence.",
            "Buy one lesson, or subscribe for the full library.",
          ].map((line) => (
            <p
              key={line}
              className="font-[family-name:var(--font-body)] text-base leading-relaxed text-ink-soft md:text-[1.05rem]"
            >
              {line}
            </p>
          ))}
        </div>
      </section>

      <section className="shell py-16 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-soft/60">
            How it works
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl tracking-[-0.03em] text-ink md:text-4xl">
            A calm path through every lesson
          </h2>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {[
            {
              step: "01",
              title: "Preview the module",
              body: "See outcomes, the table of contents, and a free sample before you pay.",
            },
            {
              step: "02",
              title: "Unlock full access",
              body: "Buy one cheap lesson, or subscribe for the full library.",
            },
            {
              step: "03",
              title: "Practice with quizzes",
              body: "Interactive checks mark answers and explain mistakes in plain language.",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="flex h-full flex-col border-l-2 border-accent/40 bg-surface/60 pl-5 pr-2 py-2"
            >
              <p className="text-sm font-semibold text-accent">{item.step}</p>
              <h3 className="mt-4 font-[family-name:var(--font-display)] text-xl tracking-[-0.02em] text-ink">
                {item.title}
              </h3>
              <p className="mt-3 flex-1 font-[family-name:var(--font-body)] text-sm leading-relaxed text-ink-soft">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-[var(--line)] bg-[rgba(232,226,216,0.45)]">
        <div className="shell py-16 md:py-20">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-soft/60">
                Featured lessons
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl tracking-[-0.03em] text-ink md:text-4xl">
                Start with high-demand skills
              </h2>
            </div>
            <Link
              href="/catalog"
              className="hidden text-sm font-semibold text-accent-deep hover:underline sm:inline"
            >
              View catalog
            </Link>
          </div>

          <div className="mt-10 grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {showcase.map((item) => (
              <ContentCard key={item.slug} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="shell py-12 md:py-14">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-soft/60">
              Topics
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl tracking-[-0.03em] text-ink">
              Browse by subject
            </h2>
          </div>
          <Link href="/catalog" className="text-sm font-semibold text-accent-deep hover:underline">
            All lessons
          </Link>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/catalog?category=${encodeURIComponent(category.name)}`}
              className="rounded-lg border border-[var(--line)] bg-surface px-3 py-1.5 text-sm text-ink-soft transition hover:border-accent/35 hover:text-accent-deep"
            >
              {category.name}
              <span className="ml-1.5 text-ink-soft/55">{category.count}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-[var(--line)] bg-surface/80">
        <div className="shell py-16 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-soft/60">
              FAQ
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl tracking-[-0.03em] text-ink md:text-4xl">
              Before you unlock
            </h2>
          </div>
          <FaqAccordion items={faqItems} />
        </div>
      </section>

      <section className="shell py-16 md:pb-24 md:pt-20">
        <div className="overflow-hidden rounded-[1.85rem] bg-ink px-6 py-14 text-center text-paper shadow-lift md:px-12">
          <div className="mx-auto mb-6 h-1 w-16 rounded-full bg-glow/70" />
          <h2 className="mx-auto max-w-2xl font-[family-name:var(--font-display)] text-3xl tracking-[-0.03em] md:text-4xl">
            Unlock a lesson. Finish it properly.
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-[family-name:var(--font-body)] text-base leading-relaxed text-paper/65">
            Browse the catalog, preview what you need, and unlock when you are ready to study.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/catalog"
              className="rounded-xl bg-accent px-6 py-3 text-sm font-bold text-paper transition hover:bg-accent-deep"
            >
              Browse lessons
            </Link>
            <Link
              href="/pricing"
              className="rounded-xl border border-white/15 px-6 py-3 text-sm font-semibold text-paper transition hover:bg-white/5"
            >
              See plans
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
