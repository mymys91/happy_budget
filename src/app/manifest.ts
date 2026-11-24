import type { MetadataRoute } from "next";

/** Lets people "Add to Home Screen" on their phone so HappyBudget opens like an app. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "HappyBudget",
    short_name: "HappyBudget",
    description: "Budget, savings and investment tracker",
    start_url: "/dashboard",
    display: "standalone",
    background_color: "#fff8f3",
    theme_color: "#e5679a",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
