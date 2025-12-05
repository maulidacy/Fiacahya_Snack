// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          caramel: "#C48A4A",
          caramelSoft: "#E7B57B",
          gold: "#F4C58A",
          latte: "#FFF3E2",
          cream: "#FFF6EA",
          blush: "#FCE6D2",
        },
        "text-light": "#3A261A",
        "text-muted": "#6A4A35",
        "text-soft": "#8C6647",
        "text-dark": "#F3F3E8",
        "bg-light": "#FAFAF8",
        "bg-soft": "#FFF7EF",
        "bg-dark": "#090605",
        "bg-elevated-dark": "#15100C",
        coffee: "#5C4033",
        pandan: "#9BCF65",
        eggyolk: "#F2C94C",
        "border-soft": "#E3C9A8",
        "border-soft-dark": "#2B2118",
        success: "#43A047",
        warning: "#F2C94C",
        danger: "#E53935",
      },
      boxShadow: {
        soft: "0 8px 20px rgba(0,0,0,0.06)",
        "soft-lg": "0 18px 60px rgba(0,0,0,0.12)",
        glow:
          "0 0 0 1px rgba(244,197,138,0.4), 0 18px 40px rgba(0,0,0,0.18)",
      },
      borderRadius: {
        xl: "0.875rem",
        "3xl": "1.5rem",
        pill: "999px",
      },
    },
  },
  plugins: [],
};

export default config;
