export type ContentType = "course" | "guide" | "explainer" | "howto";
export type ContentLevel = "beginner" | "intermediate" | "advanced";
export type ContentTier = "standard" | "deep";

export interface ContentMeta {
  slug: string;
  title: string;
  summary: string;
  category: string;
  type: ContentType;
  level: ContentLevel;
  tier: ContentTier;
  price: number;
  minutes: number;
  tags: string[];
  featured?: boolean;
  publishedAt: string;
  quizCount?: number;
}

export interface QuizOption {
  id: string;
  text: string;
}

export interface QuizQuestion {
  id: string;
  prompt: string;
  options: QuizOption[];
  correctOptionId: string;
  explanation: string;
  wrongExplanations?: Record<string, string>;
}

export interface Quiz {
  id: string;
  title: string;
  intro?: string;
  questions: QuizQuestion[];
}

export interface ContentItem extends ContentMeta {
  content: string;
  html: string;
  wordCount: number;
  quizzes: Quiz[];
}
