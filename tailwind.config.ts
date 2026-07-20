import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#17211b",
        field: "#f4f6f3",
        paper: "#ffffff",
        line: "#dfe5dd",
        moss: "#315d4a",
        lake: "#246b7a",
        clay: "#a85525",
        sun: "#e0a11b",
        berry: "#a33b55"
      },
      boxShadow: {
        panel: "0 14px 40px rgba(23, 33, 27, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
