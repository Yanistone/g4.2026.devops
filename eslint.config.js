// ESLint flat config (ESLint v9+/v10). Remplace l'ancien .eslintrc.json.
// https://eslint.org/docs/latest/use/configure/configuration-files
const js = require("@eslint/js");
const tseslint = require("typescript-eslint");

module.exports = tseslint.config(
  // Fichiers/dossiers ignorés (remplace .eslintignore).
  {
    ignores: ["dist/", "node_modules/"],
  },
  // Règles recommandées ESLint + TypeScript.
  js.configs.recommended,
  ...tseslint.configs.recommended,
  // Réglages spécifiques au projet (Node + TypeScript).
  {
    files: ["src/**/*.ts"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        process: "readonly",
        console: "readonly",
      },
    },
    rules: {
      // Point-virgule obligatoire en fin d'instruction.
      semi: ["error", "always"],
    },
  },
);
