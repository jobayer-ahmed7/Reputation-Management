// eslint.config.mjs
import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  { ignores: ["node_modules/*", "dist/*"] },
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      eqeqeq: "off",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "error",
      "no-unused-expressions": "error",
      "no-console": "warn",
      "prefer-const": "warn",
      "no-undef": "error",
    },
    "globals": {
      "process": "readonly",
    }
  },
];
