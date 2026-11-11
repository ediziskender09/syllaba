export const metadata = {
  title: "Contact",
  description: "Contact Syllaba for support, partnerships, or content requests.",
};

export default function ContactPage() {
  return (
    <div className="shell py-12 md:py-16">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-soft/60">
          Contact
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl tracking-[-0.04em] text-ink md:text-5xl">
          Get in touch
        </h1>
        <p className="mt-5 text-base leading-relaxed text-ink-soft">
          For support, partnerships, or lesson requests, email us at{" "}
          <a
            className="font-semibold text-accent-deep underline"
            href="mailto:support@getsyllaba.com"
          >
            support@getsyllaba.com
          </a>
          .
        </p>
      </div>
    </div>
  );
}
