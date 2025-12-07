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
        /* BRAND – warm bakery accent */
        brand: {
          caramel: "#C48A4A",
          caramelSoft: "#E7B57B",
          gold: "#F4C58A",
          latte: "#FFF3E2",
          cream: "#FFF6EA",
          blush: "#FCE6D2",
        },

        /* TEXT */
        "text-light": "#1F2933", // utama di light (lebih netral)
        "text-muted": "#6A4A35",
        "text-soft": "#8C6647",
        "text-dark": "#F3F3E8", // utama di dark

        /* BACKGROUND / SURFACE */
        "bg-light": "#FFFFFF", // global light: putih polos
        "bg-soft": "#F7F7F5",  // panel / card lembut
        "bg-dark": "#050608",  // global dark: charcoal
        "bg-elevated-dark": "#111318", // card dark

        /* SPECIAL */
        coffee: "#5C4033",
        pandan: "#9BCF65",
        eggyolk: "#F2C94C",

        /* BORDER */
        "border-soft": "#E5E5E0",
        "border-soft-dark": "#27272F",

        /* STATUS */
        success: "#43A047",
        warning: "#F2C94C",
        danger: "#E53935",
      },
      boxShadow: {
        soft: "0 8px 20px rgba(0,0,0,0.04)",
        "soft-lg": "0 18px 60px rgba(0,0,0,0.12)",
        glow:
          "0 0 0 1px rgba(196,138,74,0.4), 0 18px 40px rgba(0,0,0,0.18)",
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
