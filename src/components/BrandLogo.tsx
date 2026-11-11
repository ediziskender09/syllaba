import Image from "next/image";
import Link from "next/link";

type Props = {
  href?: string;
  size?: "sm" | "md" | "lg";
  tone?: "light" | "dark";
  showWordmark?: boolean;
};

const sizes = {
  sm: 28,
  md: 34,
  lg: 44,
};

export function BrandLogo({
  href = "/",
  size = "md",
  tone = "light",
  showWordmark = true,
}: Props) {
  const px = sizes[size];
  const textClass = tone === "dark" ? "text-paper" : "text-ink";
  const textSize =
    size === "lg" ? "text-2xl" : size === "sm" ? "text-lg" : "text-xl";

  return (
    <Link href={href} className="group inline-flex items-center gap-2.5">
      <span className="relative overflow-hidden" style={{ width: px, height: px }}>
        <Image
          src="/brand/syllaba-mark.png"
          alt="Syllaba"
          width={px}
          height={px}
          className="h-full w-full object-contain"
          priority
        />
      </span>
      {showWordmark ? (
        <span
          className={`font-[family-name:var(--font-display)] font-semibold tracking-[-0.03em] ${textSize} ${textClass}`}
        >
          Syllaba
        </span>
      ) : null}
    </Link>
  );
}
