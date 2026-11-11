import Link from "next/link";

export const metadata = {
  title: "Pricing",
  description: "Buy a single Syllaba lesson or subscribe for full library access.",
};

const plans = [
  {
    name: "Single lesson",
    price: "$5–9",
    period: "one-time",
    blurb: "Unlock one complete module with quizzes when you only need that skill.",
    points: [
      "Full lesson + interactive quizzes",
      "Keep access after purchase",
      "Preview free before you buy",
    ],
    cta: "Browse lessons",
    href: "/catalog",
    highlight: false,
  },
  {
    name: "Library subscription",
    price: "$19",
    period: "/ month",
    blurb: "One subscription. Full access to every lesson in the Syllaba library.",
    points: [
      "All current lessons unlocked",
      "New lessons included while subscribed",
      "Cancel anytime",
    ],
    cta: "Start with catalog",
    href: "/catalog",
    highlight: true,
  },
];

export default function PricingPage() {
  return (
    <div className="shell py-10 md:py-14">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-soft/60">
          Pricing
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl tracking-[-0.04em] md:text-5xl">
          Cheap per lesson. One library plan.
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">
          Buy only what you need, or subscribe once for the full library.
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-4xl auto-rows-fr gap-5 md:grid-cols-2">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`flex h-full flex-col rounded-[1.5rem] border p-6 md:p-8 ${
              plan.highlight
                ? "border-glow/30 bg-ink text-paper shadow-lift"
                : "border-[var(--line)] bg-surface shadow-soft"
            }`}
          >
            <p
              className={`text-xs font-semibold uppercase tracking-[0.16em] ${
                plan.highlight ? "text-glow" : "text-ink-soft/60"
              }`}
            >
              {plan.name}
            </p>
            <p className="mt-3 font-[family-name:var(--font-display)] text-4xl tracking-[-0.03em]">
              {plan.price}
              <span
                className={`ml-2 text-base font-medium ${
                  plan.highlight ? "text-paper/55" : "text-ink-soft"
                }`}
              >
                {plan.period}
              </span>
            </p>
            <p
              className={`mt-3 text-sm leading-relaxed ${
                plan.highlight ? "text-paper/70" : "text-ink-soft"
              }`}
            >
              {plan.blurb}
            </p>
            <ul className="mt-5 flex-1 space-y-2 text-sm">
              {plan.points.map((point) => (
                <li key={point} className="flex gap-2">
                  <span className={plan.highlight ? "text-glow" : "text-accent-deep"}>
                    ✓
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <Link
              href={plan.href}
              className={`mt-7 inline-flex justify-center rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                plan.highlight
                  ? "bg-accent text-paper hover:bg-accent-deep"
                  : "bg-ink text-paper hover:bg-accent-deep"
              }`}
            >
              {plan.cta}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
