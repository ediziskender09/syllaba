import type { MetadataRoute } from "next";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#F4F0EA",
    theme_color: "#1C1917",
    icons: [
      {
        src: "/brand/syllaba-mark.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
