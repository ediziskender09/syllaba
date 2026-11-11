import Link from "next/link";
import { notFound } from "next/navigation";
import { ContentCard } from "@/components/ContentCard";
import { LessonGate } from "@/components/LessonGate";
import { getLessonSegments, getRelatedContent } from "@/lib/content";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const result = await getLessonSegments(slug);
  if (!result) return { title: "Lesson not found" };
  return {
    title: result.item.title,
    description: result.item.summary,
  };
}

export default async function LearnPage({ params }: Props) {
  const { slug } = await params;
  const result = await getLessonSegments(slug);
  if (!result) notFound();

  const { item, segments, outline, highlights, teaserHtml } = result;
  const related = getRelatedContent(item.slug, item.category);

  return (
    <div className="shell py-10 md:py-14">
      <Link
        href="/catalog"
        className="text-sm font-medium text-accent-deep hover:underline"
      >
        ← Back to catalog
      </Link>

      <LessonGate
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
        segments={segments}
      />

      {related.length > 0 && (
        <section className="mt-14">
          <h2 className="font-[family-name:var(--font-display)] text-2xl tracking-[-0.03em]">
            Related in {item.category}
          </h2>
          <div className="mt-5 grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((rel) => (
              <ContentCard key={rel.slug} item={rel} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
