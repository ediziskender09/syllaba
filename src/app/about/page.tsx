export const metadata = {
  title: "About",
  description: "Syllaba builds deep, structured lessons with practice and quizzes.",
};

export default function AboutPage() {
  return (
    <div className="shell py-12 md:py-16">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-soft/60">
          About
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl tracking-[-0.04em] text-ink md:text-5xl">
          Learning content built for depth
        </h1>
        <div className="prose-learn mt-8">
          <p>
            Syllaba is a library of long-form lessons designed to be studied properly.
            Each module includes clear outcomes, structured teaching, examples, and
            interactive quizzes that explain mistakes.
          </p>
          <p>
            The goal is simple: give people a better alternative to shallow answers —
            lessons that are useful enough to pay for, and clear enough to finish.
          </p>
        </div>
      </div>
    </div>
  );
}
