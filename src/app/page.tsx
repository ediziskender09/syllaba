import Image from "next/image";
import Link from "next/link";
import { ContentCard } from "@/components/ContentCard";
import { FaqAccordion } from "@/components/FaqAccordion";
import { HeroPreview } from "@/components/HeroPreview";
import { getAllContentMeta, getCategories } from "@/lib/content";

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
    a: "New modules are added regularly across high-demand skills. The catalog grows over time, and every lesson stays listed in the full library.",
  },
];

export default function HomePage() {
  const all = getAllContentMeta();
  const categories = getCategories();
  const spotlight = all[0];
  const lessonsByCategory = categories.map((category) => ({
    ...category,
    lessons: all.filter(
      (item) => item.category.toLowerCase() === category.name.toLowerCase(),
    ),
  }));

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
              {all.length} long-form lessons across {categories.length} topics — with worked
              examples and quizzes that explain every wrong answer.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="#library"
                className="rounded-xl bg-ink px-6 py-3 text-sm font-semibold text-paper shadow-soft transition hover:bg-accent-deep"
              >
                Browse all {all.length} lessons
              </Link>
              <Link
                href="/catalog"
                className="rounded-xl border border-[var(--line)] bg-surface/80 px-6 py-3 text-sm font-semibold text-ink transition hover:border-accent/35"
              >
                Open full catalog
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
            "One library subscription unlocks every lesson below.",
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

      <section id="library" className="scroll-mt-24 border-b border-[var(--line)] bg-[rgba(232,226,216,0.45)]">
        <div className="shell py-16 md:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-soft/60">
                Full library
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl tracking-[-0.03em] text-ink md:text-4xl">
                Every Syllaba lesson, in one place
              </h2>
              <p className="mt-3 text-base leading-relaxed text-ink-soft">
                {all.length} modules across {categories.length} subjects. Preview any lesson free,
                then unlock with the library plan.
              </p>
            </div>
            <Link
              href="/catalog"
              className="rounded-xl bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition hover:bg-accent-deep"
            >
              Search & filter catalog
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {categories.map((category) => (
              <a
                key={category.name}
                href={`#topic-${category.name.toLowerCase().replace(/\s+/g, "-")}`}
                className="rounded-lg border border-[var(--line)] bg-surface px-3 py-1.5 text-sm text-ink-soft transition hover:border-accent/35 hover:text-accent-deep"
              >
                {category.name}
                <span className="ml-1.5 text-ink-soft/55">{category.count}</span>
              </a>
            ))}
          </div>

          <div className="mt-12 space-y-14">
            {lessonsByCategory.map((group) => (
              <div
                key={group.name}
                id={`topic-${group.name.toLowerCase().replace(/\s+/g, "-")}`}
                className="scroll-mt-28"
              >
                <div className="flex items-end justify-between gap-3">
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-2xl tracking-[-0.03em] text-ink">
                      {group.name}
                    </h3>
                    <p className="mt-1 text-sm text-ink-soft">
                      {group.count} {group.count === 1 ? "lesson" : "lessons"}
                    </p>
                  </div>
                  <Link
                    href={`/catalog?category=${encodeURIComponent(group.name)}`}
                    className="text-sm font-semibold text-accent-deep hover:underline"
                  >
                    View in catalog
                  </Link>
                </div>
                <div className="mt-6 grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {group.lessons.map((item) => (
                    <ContentCard key={item.slug} item={item} />
                  ))}
                </div>
              </div>
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
              title: "Browse the library",
              body: "Pick any lesson from the full catalog. Filter by topic or open a preview first.",
            },
            {
              step: "02",
              title: "Unlock the library",
              body: "Subscribe once for access to every current lesson, plus new ones while active.",
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
            The whole library is ready to browse.
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-[family-name:var(--font-body)] text-base leading-relaxed text-paper/65">
            {all.length} lessons are listed above and in the catalog. Preview freely, then
            subscribe when you want full access.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="#library"
              className="rounded-xl bg-accent px-6 py-3 text-sm font-bold text-paper transition hover:bg-accent-deep"
            >
              See all lessons
            </Link>
            <Link
              href="/catalog"
              className="rounded-xl border border-white/15 px-6 py-3 text-sm font-semibold text-paper transition hover:bg-white/5"
            >
              Open catalog
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
