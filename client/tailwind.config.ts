import { link } from "fs";
import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        bgPrimary: "#F6F8F5",

        title: "#536942",
        subtitle: "#526840BF",
        link: "#FFD936",
        linkHover: "#DAB200",
      },
      fontFamily: {
        serif: ["Lora", "serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
