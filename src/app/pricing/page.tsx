import Link from "next/link";

export const metadata = {
  title: "Pricing",
  description: "Subscribe to Syllaba for full library access to every lesson.",
};

const plan = {
  name: "Library subscription",
  price: "$39.99",
  period: "/ month",
  blurb: "One subscription. Full access to every lesson in the Syllaba library.",
  points: [
    "All current lessons unlocked",
    "New lessons included while subscribed",
    "Cancel anytime",
  ],
  cta: "Browse the library",
  href: "/catalog",
};

export default function PricingPage() {
  return (
    <div className="shell py-10 md:py-14">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-soft/60">
          Pricing
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl tracking-[-0.04em] md:text-5xl">
          One plan. Full library.
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">
          Subscribe once and unlock every Syllaba lesson while your membership is active.
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-md">
        <div className="flex h-full flex-col rounded-[1.5rem] border border-glow/30 bg-ink p-6 text-paper shadow-lift md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-glow">
            {plan.name}
          </p>
          <p className="mt-3 font-[family-name:var(--font-display)] text-4xl tracking-[-0.03em]">
            {plan.price}
            <span className="ml-2 text-base font-medium text-paper/55">{plan.period}</span>
          </p>
          <p className="mt-3 text-sm leading-relaxed text-paper/70">{plan.blurb}</p>
          <ul className="mt-5 flex-1 space-y-2 text-sm">
            {plan.points.map((point) => (
              <li key={point} className="flex gap-2">
                <span className="text-glow">✓</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <Link
            href={plan.href}
            className="mt-7 inline-flex justify-center rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-paper transition hover:bg-accent-deep"
          >
            {plan.cta}
          </Link>
        </div>
      </div>
    </div>
  );
}
