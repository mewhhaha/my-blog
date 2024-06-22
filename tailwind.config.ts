import { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

export default {
  content: ["app/**/*.{ts,tsx}"],
  plugins: [typography],
} satisfies Config;
