import Image from "next/image";
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
    a: "New modules are added regularly across high-demand skills. Browse the full catalog anytime — it is the home for every lesson as the library grows.",
  },
];

export default function HomePage() {
  const all = getAllContentMeta();
  const categories = getCategories();
  const featured = getFeaturedContent();
  const starters = (featured.length ? featured : all).slice(0, 3);
  const spotlight = starters[0] ?? all[0];

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
            <div className="mt-5 flex items-center gap-4">
              <Image
                src="/brand/syllaba-mark.png"
                alt="Syllaba logo"
                width={56}
                height={56}
                className="h-14 w-14 object-contain"
                priority
              />
              <p className="font-[family-name:var(--font-display)] text-[clamp(2.8rem,6.5vw,4.4rem)] leading-none tracking-[-0.05em] text-ink">
                Syllaba
              </p>
            </div>
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
                className="rounded-xl bg-ink px-6 py-3.5 text-sm font-semibold text-paper shadow-soft transition hover:bg-accent-deep"
              >
                Browse all lessons
              </Link>
              <Link
                href="/pricing"
                className="rounded-xl border border-[var(--line)] bg-surface/80 px-6 py-3.5 text-sm font-semibold text-ink transition hover:border-accent/35"
              >
                View pricing
              </Link>
            </div>
            <p className="mt-4 text-sm text-ink-soft/80">
              {all.length} lessons · {categories.length} topics · growing library
            </p>
          </div>

          <HeroPreview category={spotlight?.category} title={spotlight?.title} />
        </div>
      </section>

      <section className="border-b border-[var(--line)] bg-ink text-paper">
        <div className="shell flex flex-col items-start justify-between gap-6 py-10 md:flex-row md:items-center md:py-12">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-glow">
              Lesson catalog
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl tracking-[-0.03em] md:text-4xl">
              Find every lesson in one place
            </h2>
            <p className="mt-3 text-base leading-relaxed text-paper/65">
              Search, filter by topic, and open any module. The catalog is the doorway to the
              full Syllaba library — not just a few highlights.
            </p>
          </div>
          <Link
            href="/catalog"
            className="inline-flex shrink-0 rounded-xl bg-accent px-7 py-3.5 text-sm font-bold text-paper transition hover:bg-accent-deep"
          >
            Open full catalog →
          </Link>
        </div>
      </section>

      <section className="shell py-14 md:py-16">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-soft/60">
              Browse by topic
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl tracking-[-0.03em] text-ink">
              Jump straight into a subject
            </h2>
          </div>
          <Link href="/catalog" className="text-sm font-semibold text-accent-deep hover:underline">
            See all topics in catalog
          </Link>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/catalog?category=${encodeURIComponent(category.name)}`}
              className="group flex items-center justify-between rounded-[1.25rem] border border-[var(--line)] bg-surface px-5 py-5 shadow-soft transition hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-lift"
            >
              <div>
                <p className="font-[family-name:var(--font-display)] text-xl tracking-[-0.02em] text-ink transition group-hover:text-accent-deep">
                  {category.name}
                </p>
                <p className="mt-1 text-sm text-ink-soft">
                  {category.count} {category.count === 1 ? "lesson" : "lessons"}
                </p>
              </div>
              <span className="text-sm font-semibold text-accent-deep">Browse →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-[var(--line)] bg-[rgba(232,226,216,0.45)]">
        <div className="shell py-14 md:py-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-soft/60">
                Good starting points
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl tracking-[-0.03em] text-ink md:text-4xl">
                A few places to begin
              </h2>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-ink-soft">
                These are examples — the full set lives in the catalog.
              </p>
            </div>
            <Link
              href="/catalog"
              className="rounded-xl border border-[var(--line)] bg-surface px-5 py-2.5 text-sm font-semibold text-ink transition hover:border-accent/35"
            >
              Browse all lessons
            </Link>
          </div>

          <div className="mt-10 grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {starters.map((item) => (
              <ContentCard key={item.slug} item={item} />
            ))}
          </div>
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
              title: "Open the catalog",
              body: "Search or pick a topic. Every Syllaba lesson is listed there as the library grows.",
            },
            {
              step: "02",
              title: "Preview, then unlock",
              body: "Read the free sample, then subscribe for full library access.",
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
            Ready to find a lesson?
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-[family-name:var(--font-body)] text-base leading-relaxed text-paper/65">
            Go to the catalog, filter by topic, and preview anything before you unlock.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/catalog"
              className="rounded-xl bg-accent px-6 py-3 text-sm font-bold text-paper transition hover:bg-accent-deep"
            >
              Browse all lessons
            </Link>
            <Link
              href="/pricing"
              className="rounded-xl border border-white/15 px-6 py-3 text-sm font-semibold text-paper transition hover:bg-white/5"
            >
              See pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
