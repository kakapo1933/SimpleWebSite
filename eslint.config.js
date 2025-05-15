import globals from "globals";
import tseslint from "typescript-eslint";
import js from "@eslint/js";

// Import Prettier config to work with ESLint
import prettierConfig from './.prettierrc' assert { type: 'json' };

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,tsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    }
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    rules: {
      // Prettier will handle most formatting rules, so we remove conflicting rules

      // TypeScript specific rules
      "@typescript-eslint/explicit-function-return-type": ["error", { "allowExpressions": true }],
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/naming-convention": [
        "error",
        {
          "selector": "interface",
          "format": ["PascalCase"],
          "prefix": ["I"]
        },
        {
          "selector": "typeAlias",
          "format": ["PascalCase"]
        }
      ]
    }
  },
  // Add Prettier config as the last item to override any conflicting rules
  {
    files: ["**/*.{js,mjs,cjs,ts,tsx,json,md,html,css}"],
    plugins: {
      prettier: {
        rules: {
          "prettier/prettier": ["error", prettierConfig]
        }
      }
    },
    rules: {
      "prettier/prettier": "error"
    }
  }
];