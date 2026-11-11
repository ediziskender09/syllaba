/**
 * Allow only same-origin relative paths for post-login / checkout redirects.
 */
export function safeRedirectPath(input: unknown, fallback = "/account"): string {
  if (typeof input !== "string") return fallback;
  const value = input.trim();
  if (!value.startsWith("/")) return fallback;
  if (value.startsWith("//")) return fallback;
  if (value.includes("://")) return fallback;
  if (value.includes("\\")) return fallback;
  if (/[\x00-\x1f\x7f]/.test(value)) return fallback;

  try {
    const url = new URL(value, "https://getsyllaba.com");
    if (url.origin !== "https://getsyllaba.com") return fallback;
    const path = `${url.pathname}${url.search}${url.hash}`;
    if (!path.startsWith("/")) return fallback;
    return path;
  } catch {
    return fallback;
  }
}
