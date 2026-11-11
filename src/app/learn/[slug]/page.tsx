import Link from "next/link";
import { notFound } from "next/navigation";
import { ContentCard } from "@/components/ContentCard";
import { LessonCheckout } from "@/components/LessonCheckout";
import { LessonContent } from "@/components/LessonContent";
import { auth } from "@/auth";
import { getAccessSnapshot, hasLessonAccess } from "@/lib/access";
import { JsonLd } from "@/components/JsonLd";
import { getLessonSegments, getRelatedContent } from "@/lib/content";
import { buildPageMetadata, courseJsonLd } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const result = await getLessonSegments(slug);
  if (!result) return { title: "Lesson not found" };
  return buildPageMetadata({
    title: result.item.title,
    description: result.item.summary,
    path: `/learn/${result.item.slug}`,
    keywords: result.item.tags,
    type: "article",
  });
}

export default async function LearnPage({ params }: Props) {
  const { slug } = await params;
  const result = await getLessonSegments(slug);
  if (!result) notFound();

  const { item, segments, outline, highlights, teaserHtml } = result;
  const related = getRelatedContent(item.slug, item.category);
  const session = await auth();
  const userId = session?.user?.id;
  const unlocked = await hasLessonAccess(userId, item.slug);
  const access = userId ? await getAccessSnapshot(userId) : null;
  const accessLabel = access?.hasLibrary
    ? "Library access"
    : unlocked
      ? "Purchased"
      : "Locked";

  return (
    <div className="shell py-10 md:py-14">
      <JsonLd
        data={courseJsonLd({
          name: item.title,
          description: item.summary,
          path: `/learn/${item.slug}`,
          category: item.category,
        })}
      />
      <Link
        href="/catalog"
        className="text-sm font-medium text-accent-deep hover:underline"
      >
        ← Back to catalog
      </Link>

      {unlocked ? (
        <LessonContent
          title={item.title}
          summary={item.summary}
          category={item.category}
          accessLabel={accessLabel}
          segments={segments}
        />
      ) : (
        <LessonCheckout
          slug={item.slug}
          title={item.title}
          summary={item.summary}
          category={item.category}
          price={item.price}
          minutes={item.minutes}
          quizCount={item.quizzes.length}
          tags={item.tags}
          outline={outline}
          highlights={highlights}
          teaserHtml={teaserHtml}
          signedIn={Boolean(userId)}
        />
      )}

      {related.length > 0 && (
        <section className="mt-14">
          <h2 className="font-[family-name:var(--font-display)] text-2xl tracking-[-0.03em]">
            Related in {item.category}
          </h2>
          <div className="mt-5 grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((rel) => (
              <ContentCard
                key={rel.slug}
                item={rel}
                badge={
                  access?.hasLibrary
                    ? "In library"
                    : access?.purchasedSlugs.includes(rel.slug)
                      ? "Owned"
                      : undefined
                }
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
