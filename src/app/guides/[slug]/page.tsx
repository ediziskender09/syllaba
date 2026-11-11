import Link from "next/link";
import { notFound } from "next/navigation";
import { ContentCard } from "@/components/ContentCard";
import { JsonLd } from "@/components/JsonLd";
import { getContentBySlugMeta } from "@/lib/content";
import {
  breadcrumbJsonLd,
  buildPageMetadata,
  faqJsonLd,
} from "@/lib/seo";
import {
  getAllSeoPages,
  getSeoPageBySlug,
  getSeoPagesByCluster,
} from "@/lib/seo-pages";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllSeoPages().map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const page = getSeoPageBySlug(slug);
  if (!page) return { title: "Guide not found" };
  return buildPageMetadata({
    title: page.title,
    description: page.description,
    path: `/guides/${page.slug}`,
    keywords: page.keywords,
    type: "article",
  });
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const page = getSeoPageBySlug(slug);
  if (!page) notFound();

  const relatedLessons = page.relatedLessonSlugs
    .map((lessonSlug) => getContentBySlugMeta(lessonSlug))
    .filter(Boolean);
  const relatedGuides = getSeoPagesByCluster(page.cluster)
    .filter((item) => item.slug !== page.slug)
    .slice(0, 6);

  return (
    <div className="shell py-10 md:py-14">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Guides", path: "/guides" },
            { name: page.title, path: `/guides/${page.slug}` },
          ]),
          faqJsonLd(page.faqs),
        ]}
      />

      <Link
        href="/guides"
        className="text-sm font-medium text-accent-deep hover:underline"
      >
        ← All guides
      </Link>

      <article className="mx-auto mt-6 max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-soft/60">
          {page.cluster} guide
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl tracking-[-0.04em] text-ink md:text-5xl">
          {page.h1}
        </h1>
        <div className="mt-6 space-y-4 text-base leading-relaxed text-ink-soft">
          {page.intro.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/catalog"
            className="rounded-xl bg-ink px-5 py-3 text-sm font-semibold text-paper transition hover:bg-accent-deep"
          >
            Browse catalog
          </Link>
          {relatedLessons[0] ? (
            <Link
              href={`/learn/${relatedLessons[0]!.slug}`}
              className="rounded-xl border border-[var(--line)] bg-paper px-5 py-3 text-sm font-semibold text-ink transition hover:border-accent/30"
            >
              Open related lesson
            </Link>
          ) : null}
        </div>

        <div className="mt-12 space-y-10">
          {page.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-[family-name:var(--font-display)] text-2xl tracking-[-0.02em] text-ink">
                {section.heading}
              </h2>
              <div className="mt-3 space-y-3 text-base leading-relaxed text-ink-soft">
                {section.body.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        {page.faqs.length > 0 ? (
          <section className="mt-12">
            <h2 className="font-[family-name:var(--font-display)] text-2xl tracking-[-0.02em] text-ink">
              FAQ
            </h2>
            <div className="mt-4 space-y-4">
              {page.faqs.map((faq) => (
                <div
                  key={faq.question}
                  className="rounded-[1.2rem] border border-[var(--line)] bg-surface p-5"
                >
                  <h3 className="text-sm font-semibold text-ink">{faq.question}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {relatedLessons.length > 0 ? (
          <section className="mt-12">
            <h2 className="font-[family-name:var(--font-display)] text-2xl tracking-[-0.02em] text-ink">
              Related Syllaba lessons
            </h2>
            <div className="mt-5 grid gap-4">
              {relatedLessons.map((lesson) =>
                lesson ? (
                  <ContentCard key={lesson.slug} item={lesson} />
                ) : null,
              )}
            </div>
          </section>
        ) : null}

        {relatedGuides.length > 0 ? (
          <section className="mt-12">
            <h2 className="font-[family-name:var(--font-display)] text-2xl tracking-[-0.02em] text-ink">
              More guides in {page.cluster}
            </h2>
            <ul className="mt-4 space-y-2">
              {relatedGuides.map((guide) => (
                <li key={guide.slug}>
                  <Link
                    href={`/guides/${guide.slug}`}
                    className="text-sm font-medium text-accent-deep hover:underline"
                  >
                    {guide.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </article>
    </div>
  );
}
