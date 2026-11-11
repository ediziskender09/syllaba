import Link from "next/link";
import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { buildPageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { getAllSeoPages, getSeoClusters } from "@/lib/seo-pages";

export const metadata: Metadata = buildPageMetadata({
  title: "Guides & SEO Learning Pages",
  description:
    "Browse Syllaba guides for learning paths, topic hubs, and lesson companions across programming, data, AI, career, and more.",
  path: "/guides",
  keywords: ["Syllaba guides", "online learning guides", "how to learn"],
  type: "website",
});

type Props = {
  searchParams: Promise<{ cluster?: string }>;
};

export default async function GuidesIndexPage({ searchParams }: Props) {
  const params = await searchParams;
  const clusters = getSeoClusters();
  const all = getAllSeoPages();
  const filtered = params.cluster
    ? all.filter(
        (page) => page.cluster.toLowerCase() === params.cluster!.toLowerCase(),
      )
    : all;

  return (
    <div className="shell py-10 md:py-14">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Guides", path: "/guides" },
        ])}
      />

      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-soft/60">
          Guides
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl tracking-[-0.04em] text-ink md:text-5xl">
          Learning guides & topic pages
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">
          Professional search pages for every Syllaba skill area — paths, beginner
          courses, and how-to guides that link into full lessons.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-2">
        <Link
          href="/guides"
          className={`rounded-full px-3 py-1.5 text-sm ${
            !params.cluster
              ? "bg-ink text-paper"
              : "border border-[var(--line)] text-ink-soft hover:border-accent/30"
          }`}
        >
          All
        </Link>
        {clusters.map((cluster) => (
          <Link
            key={cluster.name}
            href={`/guides?cluster=${encodeURIComponent(cluster.name)}`}
            className={`rounded-full px-3 py-1.5 text-sm ${
              params.cluster === cluster.name
                ? "bg-ink text-paper"
                : "border border-[var(--line)] text-ink-soft hover:border-accent/30"
            }`}
          >
            {cluster.name}
          </Link>
        ))}
      </div>

      <div className="mx-auto mt-10 grid max-w-5xl gap-4 md:grid-cols-2">
        {filtered.map((page) => (
          <Link
            key={page.slug}
            href={`/guides/${page.slug}`}
            className="rounded-[1.4rem] border border-[var(--line)] bg-surface p-5 transition hover:border-accent/30"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft/55">
              {page.cluster}
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-xl tracking-[-0.02em] text-ink">
              {page.h1}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              {page.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
