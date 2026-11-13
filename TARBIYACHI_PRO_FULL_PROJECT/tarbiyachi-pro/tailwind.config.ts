import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: { extend: {
    colors: {
      cream: "#F7F3E8", mint: "#A9DCC8", peach: "#FFB9A5",
      sunshine: "#F7D66D", skysoft: "#A9B9ED", lavender: "#BBA5D9",
      ink: "#303747", muted: "#727989"
    },
    boxShadow: { soft: "0 14px 40px rgba(48,55,71,.08)" },
    borderRadius: { "4xl": "2rem" }
  }},
  plugins: []
};
export default config;
