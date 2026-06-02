// @ts-check
import { nestConfig } from "@repo/eslint-config/nest";

export default [
  ...nestConfig,
  {
    ignores: ["eslint.config.mjs"],
  },
  {
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
];
