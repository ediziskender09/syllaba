import { ContentCard } from "@/components/ContentCard";
import { getAllContentMeta, getCategories } from "@/lib/content";

type Props = {
  searchParams: Promise<{ category?: string; q?: string }>;
};

export const metadata = {
  title: "Catalog",
  description: "Browse Syllaba lessons across AI, programming, data, business, and creative skills.",
};

export default async function CatalogPage({ searchParams }: Props) {
  const params = await searchParams;
  const all = getAllContentMeta();
  const categories = getCategories();

  const filtered = all.filter((item) => {
    const categoryOk = params.category
      ? item.category.toLowerCase() === params.category.toLowerCase()
      : true;
    const query = (params.q ?? "").trim().toLowerCase();
    const queryOk = query
      ? item.title.toLowerCase().includes(query) ||
        item.summary.toLowerCase().includes(query) ||
        item.tags.some((tag) => tag.toLowerCase().includes(query))
      : true;
    return categoryOk && queryOk;
  });

  return (
    <div className="shell py-10 md:py-14">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-soft/60">
          Catalog
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl tracking-[-0.04em] text-ink md:text-5xl">
          All {all.length} lessons
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">
          Full Syllaba library — search or filter by topic. Preview any lesson free before you
          unlock.
        </p>
        <p className="mt-2 text-sm text-ink-soft/80">
          Showing {filtered.length} of {all.length}
          {params.category ? ` in ${params.category}` : ""}
          {params.q ? ` for “${params.q}”` : ""}.
        </p>
      </div>

      <form className="mx-auto mt-8 flex max-w-2xl flex-col gap-3 sm:flex-row" action="/catalog">
        <input
          name="q"
          defaultValue={params.q ?? ""}
          placeholder="Search lessons..."
          className="w-full rounded-xl border border-[var(--line)] bg-surface px-5 py-3 text-sm outline-none ring-accent/30 focus:ring-2"
        />
        {params.category ? (
          <input type="hidden" name="category" value={params.category} />
        ) : null}
        <button
          type="submit"
          className="rounded-xl bg-ink px-5 py-3 text-sm font-semibold text-paper"
        >
          Search
        </button>
      </form>

      <div className="mt-6 flex flex-wrap gap-2">
        <a
          href="/catalog"
          className={`rounded-lg border px-3 py-1.5 text-sm ${
            !params.category
              ? "border-accent bg-accent text-paper"
              : "border-[var(--line)] bg-surface text-ink-soft hover:border-accent/30"
          }`}
        >
          All
        </a>
        {categories.map((category) => {
          const active =
            params.category?.toLowerCase() === category.name.toLowerCase();
          const href = `/catalog?category=${encodeURIComponent(category.name)}${
            params.q ? `&q=${encodeURIComponent(params.q)}` : ""
          }`;
          return (
            <a
              key={category.name}
              href={href}
              className={`rounded-lg border px-3 py-1.5 text-sm ${
                active
                  ? "border-accent bg-accent text-paper"
                  : "border-[var(--line)] bg-surface text-ink-soft hover:border-accent/30"
              }`}
            >
              {category.name}
            </a>
          );
        })}
      </div>

      <div className="mt-10 grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <ContentCard key={item.slug} item={item} />
        ))}
      </div>

      {!filtered.length && (
        <div className="mt-10 rounded-2xl border border-dashed border-[var(--line)] bg-surface px-6 py-12 text-center text-ink-soft">
          No lessons match your search.
        </div>
      )}
    </div>
  );
}
