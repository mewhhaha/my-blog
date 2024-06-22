import { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

export default {
  content: ["app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      aria: {
        "current-page": 'current="page"',
      },
    },
  },
  plugins: [typography],
} satisfies Config;
