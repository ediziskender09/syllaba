import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";
import type { ContentItem, ContentMeta, Quiz } from "@/content/types";

const contentDirectory = path.join(process.cwd(), "content");
const quizDirectory = path.join(contentDirectory, "quizzes");

const QUIZ_MARKER = /<!--\s*quiz:([a-z0-9-]+)\s*-->/gi;

function countWords(text: string): number {
  return text
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/[#>*_`\-\[\]()]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
}

async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark().use(remarkGfm).use(remarkHtml).process(markdown);
  return result.toString();
}

function readMeta(fileName: string): ContentMeta & { content: string } {
  const fullPath = path.join(contentDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug: data.slug ?? fileName.replace(/\.md$/, ""),
    title: data.title,
    summary: data.summary,
    category: data.category,
    type: data.type,
    level: data.level,
    tier: data.tier,
    price: Number(data.price),
    minutes: Number(data.minutes),
    tags: data.tags ?? [],
    featured: Boolean(data.featured),
    publishedAt: data.publishedAt,
    content,
  };
}

function loadQuizzes(slug: string): Quiz[] {
  const quizPath = path.join(quizDirectory, `${slug}.json`);
  if (!fs.existsSync(quizPath)) return [];
  const raw = JSON.parse(fs.readFileSync(quizPath, "utf8")) as { quizzes?: Quiz[] } | Quiz[];
  return Array.isArray(raw) ? raw : (raw.quizzes ?? []);
}

export function getAllContentMeta(): ContentMeta[] {
  if (!fs.existsSync(contentDirectory)) return [];

  return fs
    .readdirSync(contentDirectory)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const { content, ...meta } = readMeta(file);
      void content;
      const quizzes = loadQuizzes(meta.slug);
      return { ...meta, quizCount: quizzes.length };
    })
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export function getFeaturedContent(): ContentMeta[] {
  return getAllContentMeta().filter((item) => item.featured);
}

export function getContentByCategory(category: string): ContentMeta[] {
  return getAllContentMeta().filter(
    (item) => item.category.toLowerCase() === category.toLowerCase(),
  );
}

export function getCategories(): { name: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const item of getAllContentMeta()) {
    counts.set(item.category, (counts.get(item.category) ?? 0) + 1);
  }
  return Array.from(counts.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

export type LessonSegment =
  | { kind: "html"; html: string }
  | { kind: "quiz"; quiz: Quiz };

export function extractOutline(markdown: string): string[] {
  return markdown
    .replace(QUIZ_MARKER, "")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => /^##\s+/.test(line))
    .map((line) => line.replace(/^##\s+/, "").trim())
    .filter(Boolean)
    .slice(0, 18);
}

export function extractHighlights(markdown: string): string[] {
  const withoutQuizzes = markdown.replace(QUIZ_MARKER, "");
  const match = withoutQuizzes.match(
    /##\s+What You(?:'|’)ll Learn([\s\S]*?)(?:\n##\s+|$)/i,
  );
  if (!match) return [];
  return match[1]
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("- "))
    .map((line) => line.replace(/^- /, "").trim())
    .filter(Boolean)
    .slice(0, 8);
}

export async function getTeaserHtml(markdown: string): Promise<string> {
  const cleaned = markdown.replace(QUIZ_MARKER, "").trim();
  const paragraphs = cleaned
    .split(/\n{2,}/)
    .filter((block) => !block.trim().startsWith("#"))
    .slice(0, 2)
    .join("\n\n");
  return markdownToHtml(paragraphs || cleaned.slice(0, 700));
}

export async function getLessonSegments(slug: string): Promise<{
  item: ContentItem;
  segments: LessonSegment[];
  outline: string[];
  highlights: string[];
  teaserHtml: string;
} | null> {
  const fileName = `${slug}.md`;
  const fullPath = path.join(contentDirectory, fileName);
  if (!fs.existsSync(fullPath)) return null;

  const raw = readMeta(fileName);
  const quizzes = loadQuizzes(slug);
  const quizMap = new Map(quizzes.map((quiz) => [quiz.id, quiz]));

  const parts = raw.content.split(QUIZ_MARKER);
  const segments: LessonSegment[] = [];
  const usedQuizIds = new Set<string>();

  // split with capturing group => [text, quizId, text, quizId, text...]
  for (let i = 0; i < parts.length; i += 1) {
    if (i % 2 === 0) {
      const markdown = parts[i]?.trim();
      if (markdown) {
        segments.push({ kind: "html", html: await markdownToHtml(markdown) });
      }
    } else {
      const quizId = parts[i];
      const quiz = quizMap.get(quizId);
      if (quiz) {
        segments.push({ kind: "quiz", quiz });
        usedQuizIds.add(quizId);
      }
    }
  }

  for (const quiz of quizzes) {
    if (!usedQuizIds.has(quiz.id)) {
      segments.push({ kind: "quiz", quiz });
    }
  }

  const html = await markdownToHtml(raw.content.replace(QUIZ_MARKER, ""));
  const wordCount = countWords(raw.content);
  const outline = extractOutline(raw.content);
  const highlights = extractHighlights(raw.content);
  const teaserHtml = await getTeaserHtml(raw.content);

  return {
    item: {
      ...raw,
      html,
      wordCount,
      quizzes,
    },
    segments,
    outline,
    highlights,
    teaserHtml,
  };
}

export async function getContentBySlug(slug: string): Promise<ContentItem | null> {
  const result = await getLessonSegments(slug);
  return result?.item ?? null;
}

export function getRelatedContent(slug: string, category: string, limit = 3): ContentMeta[] {
  return getAllContentMeta()
    .filter((item) => item.slug !== slug && item.category === category)
    .slice(0, limit);
}
