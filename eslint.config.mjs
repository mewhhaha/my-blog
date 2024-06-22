// @ts-check
// @ts-expect-error no type definitions
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import worker from "@mewhhaha/little-worker/eslint-plugin";
// @ts-expect-error no type definitions
import tailwind from "eslint-plugin-tailwindcss";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...tailwind.configs["flat/recommended"],
  worker.configs.recommended,
  {
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.json", "./tsconfig.node.json"],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
);
