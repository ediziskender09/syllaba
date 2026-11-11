import Link from "next/link";
import { redirect } from "next/navigation";
import { BrandLogo } from "@/components/BrandLogo";
import { auth } from "@/auth";
import { hasLessonAccess } from "@/lib/access";

type Props = {
  searchParams: Promise<{ type?: string; slug?: string }>;
};

export const metadata = {
  title: "Payment received",
  description: "Your Syllaba purchase is being confirmed.",
};

export default async function CheckoutSuccessPage({ searchParams }: Props) {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login?callbackUrl=/checkout/success");
  }

  const params = await searchParams;
  const type = params.type === "lesson" ? "lesson" : "library";
  const slug = params.slug?.trim();

  if (type === "lesson" && slug) {
    const unlocked = await hasLessonAccess(session.user.id, slug);
    if (unlocked) {
      redirect(`/learn/${slug}`);
    }
  }

  if (type === "library") {
    // Soft wait: webhook may still be processing.
  }

  return (
    <div className="shell flex min-h-[70vh] items-center justify-center py-14">
      <div className="w-full max-w-md rounded-[1.6rem] border border-[var(--line)] bg-surface p-8 text-center shadow-soft md:p-10">
        <div className="flex justify-center">
          <BrandLogo href="/" showWordmark />
        </div>
        <h1 className="mt-8 font-[family-name:var(--font-display)] text-3xl tracking-[-0.03em] text-ink">
          Payment received
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">
          {type === "lesson"
            ? "We’re confirming your lesson unlock. This usually takes a few seconds."
            : "We’re activating your library subscription. This usually takes a few seconds."}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href={type === "lesson" && slug ? `/learn/${slug}` : "/account"}
            className="rounded-xl bg-ink px-5 py-3 text-sm font-semibold text-paper transition hover:bg-accent-deep"
          >
            {type === "lesson" ? "Open lesson" : "Go to account"}
          </Link>
          <Link
            href="/catalog"
            className="rounded-xl border border-[var(--line)] bg-paper px-5 py-3 text-sm font-semibold text-ink transition hover:border-accent/30"
          >
            Browse catalog
          </Link>
        </div>
      </div>
    </div>
  );
}
