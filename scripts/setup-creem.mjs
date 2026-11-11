/**
 * Creates Syllaba products in Creem and prints env values.
 *
 * Usage:
 *   CREEM_API_KEY=creem_test_... node scripts/setup-creem.mjs
 */
import { Creem } from "creem";

const apiKey = process.env.CREEM_API_KEY?.trim();
if (!apiKey) {
  console.error("Set CREEM_API_KEY first.");
  process.exit(1);
}

const testMode = apiKey.startsWith("creem_test_");
const creem = new Creem({
  apiKey,
  server: testMode ? "test" : "prod",
});

async function listProducts() {
  const items = [];
  try {
    for await (const page of await creem.products.search(1, 100, "active")) {
      const batch = page?.result?.items ?? [];
      if (Array.isArray(batch)) items.push(...batch);
    }
  } catch (error) {
    console.warn("Product list failed, will create fresh products:", error?.message || error);
  }
  return items;
}

async function ensureProduct(spec) {
  const existing = await listProducts();
  const found = existing.find((p) => p?.name === spec.name);
  if (found?.id) {
    console.log(`Exists: ${spec.name} -> ${found.id}`);
    return found;
  }

  const created = await creem.products.create(spec);
  console.log(`Created: ${spec.name} -> ${created.id}`);
  return created;
}

const library = await ensureProduct({
  name: "Syllaba Library",
  description: "Monthly access to the full Syllaba lesson library.",
  price: 3999,
  currency: "USD",
  billingType: "recurring",
  billingPeriod: "every-month",
  taxCategory: "saas",
});

const lesson = await ensureProduct({
  name: "Syllaba Lesson",
  description: "One-time unlock for a single Syllaba lesson. Checkout sets the exact price.",
  price: 300,
  currency: "USD",
  billingType: "onetime",
  taxCategory: "digital-goods-service",
});

console.log("\nAdd these to Vercel / .env.local:\n");
console.log(`CREEM_API_KEY=${apiKey}`);
console.log(`CREEM_TEST_MODE=${testMode ? "true" : "false"}`);
console.log(`CREEM_PRODUCT_LIBRARY_ID=${library.id}`);
console.log(`CREEM_PRODUCT_LESSON_ID=${lesson.id}`);
console.log(
  "CREEM_WEBHOOK_SECRET=  # Creem Dashboard → Developers → Webhooks → https://getsyllaba.com/api/creem/webhook",
);
console.log("\nWebhook URL:");
console.log("https://getsyllaba.com/api/creem/webhook");
