import { Creem } from "creem";
import {
  LIBRARY_PRICE_CENTS,
  lessonPriceToCents,
} from "@/lib/commerce";

export function isCreemConfigured() {
  return Boolean(process.env.CREEM_API_KEY?.trim());
}

export function isCreemTestMode() {
  const key = process.env.CREEM_API_KEY ?? "";
  if (process.env.CREEM_TEST_MODE === "true") return true;
  if (process.env.CREEM_TEST_MODE === "false") return false;
  return key.startsWith("creem_test_");
}

export function getCreem() {
  const apiKey = process.env.CREEM_API_KEY?.trim();
  if (!apiKey) {
    throw new Error("CREEM_API_KEY is not configured");
  }

  return new Creem({
    apiKey,
    server: isCreemTestMode() ? "test" : "prod",
  });
}

export function siteUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    process.env.AUTH_URL?.replace(/\/$/, "") ||
    "http://localhost:3000"
  );
}

export function libraryProductId() {
  const id = process.env.CREEM_PRODUCT_LIBRARY_ID?.trim();
  if (!id) throw new Error("CREEM_PRODUCT_LIBRARY_ID is not configured");
  return id;
}

export function lessonProductId() {
  const id = process.env.CREEM_PRODUCT_LESSON_ID?.trim();
  if (!id) throw new Error("CREEM_PRODUCT_LESSON_ID is not configured");
  return id;
}

export async function createLibraryCheckout(input: {
  userId: string;
  email: string;
  name?: string | null;
  successPath?: string;
}) {
  const creem = getCreem();
  const successPath = input.successPath || "/checkout/success?type=library";

  return creem.checkouts.create({
    productId: libraryProductId(),
    requestId: `library_${input.userId}_${Date.now()}`,
    successUrl: `${siteUrl()}${successPath}`,
    customer: {
      email: input.email,
      ...(input.name ? { name: input.name } : {}),
    },
    metadata: {
      referenceId: input.userId,
      type: "library",
      userId: input.userId,
    },
  });
}

export async function createLessonCheckout(input: {
  userId: string;
  email: string;
  name?: string | null;
  lessonSlug: string;
  priceUsd: number;
  lessonTitle: string;
}) {
  const creem = getCreem();
  const amountCents = Math.max(100, lessonPriceToCents(input.priceUsd));

  return creem.checkouts.create({
    productId: lessonProductId(),
    requestId: `lesson_${input.userId}_${input.lessonSlug}_${Date.now()}`,
    successUrl: `${siteUrl()}/checkout/success?type=lesson&slug=${encodeURIComponent(input.lessonSlug)}`,
    customPrice: amountCents,
    customer: {
      email: input.email,
      ...(input.name ? { name: input.name } : {}),
    },
    metadata: {
      referenceId: input.userId,
      type: "lesson",
      userId: input.userId,
      lessonSlug: input.lessonSlug,
      lessonTitle: input.lessonTitle,
      amountCents: String(amountCents),
    },
  });
}

export async function cancelCreemSubscriptionScheduled(subscriptionId: string) {
  const creem = getCreem();
  return creem.subscriptions.cancel(subscriptionId, { mode: "scheduled" });
}

export async function resumeCreemSubscription(subscriptionId: string) {
  const creem = getCreem();
  return creem.subscriptions.resume(subscriptionId);
}

export { LIBRARY_PRICE_CENTS };
