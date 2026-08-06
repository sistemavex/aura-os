import type { Config } from "tailwindcss";

// Tokens copiados literalmente da seção 2 do documento AURA-OS-Prompt-Completo.md
const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0A0A0A",
        surface: "#141414",
        primary: {
          DEFAULT: "#C4A882",
          light: "#E8D5B7",
        },
        success: "#4ADE80",
        danger: "#F87171",
        warning: "#FBBF24",
        border: "hsl(0, 0%, 14%)",
        foreground: "hsl(0, 0%, 98%)",
        muted: "hsl(0, 0%, 55%)",
      },
      borderRadius: {
        DEFAULT: "0.625rem",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
