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
        coffee: "#5C4033",
        pandan: "#9BCF65",
        eggyolk: "#F2C94C",
        "bg-light": "#FAFAF8",
        "bg-dark": "#1C1C1A",
        "text-light": "#1E1E1E",
        "text-dark": "#F3F3E8",
        "border-soft-dark": "#333333",
      },
      boxShadow: {
        soft: "0 8px 20px rgba(0,0,0,0.06)",
      },
      borderRadius: {
        xl: "0.875rem",
        "3xl": "1.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
