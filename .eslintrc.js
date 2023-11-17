/** @type {import("eslint").Linter.Config} */
module.exports = {
  parser: "@typescript-eslint/parser",
  env: { es2020: true, browser: true, node: true },
  plugins: ["perfectionist", "only-warn"],
  parserOptions: { sourceType: "module", ecmaVersion: "latest" },
  extends: [
    "next",
    "eslint:recommended",
    "plugin:unicorn/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  rules: {
    // --- eslint ---
    "padding-line-between-statements": [
      "error",
      {
        prev: "*",
        blankLine: "always",
        next: ["multiline-block-like", "multiline-expression", "multiline-const", "multiline-let"],
      },
      {
        next: "*",
        blankLine: "always",
        prev: ["multiline-block-like", "multiline-expression", "multiline-const", "multiline-let"],
      },
    ],
    "no-restricted-imports": [
      "error",
      {
        paths: [
          {
            name: "@mui/icons-material",
            message: "Barrel imports are not allowed. Use named imports instead",
          },
          {
            name: "@mui/material",
            message: "Barrel imports are not allowed. Use named imports instead",
          },
        ],
      },
    ],

    // --- typescript-eslint ---
    "@typescript-eslint/consistent-type-imports": "error",
    "@typescript-eslint/no-unused-vars": [
      "error",
      { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
    ],

    // --- unicorn ---
    "unicorn/no-null": "off",
    "unicorn/prefer-module": "off",
    "unicorn/no-array-push-push": "off",
    "unicorn/filename-case": "off",
    "unicorn/prefer-query-selector": "off",
    "unicorn/no-array-reduce": "off",
    "unicorn/prevent-abbreviations": [
      "error",
      {
        allowList: {
          fn: true,
          db: true,
          env: true,
          ref: true,
          src: true,
          prev: true,
          args: true,
          props: true,
          params: true,
          Db: true,
          Env: true,
          Ref: true,
          Props: true,
          Params: true,
        },
      },
    ],

    // --- perfectionist ---
    "perfectionist/sort-imports": [
      "error",
      {
        order: "asc",
        type: "line-length",
        "newlines-between": "always",
        "internal-pattern": [
          "src/**",
          "src/api/**",
          "src/assets/**",
          "src/components/**",
          "src/constants/**",
          "src/context/**",
          "src/hooks/**",
          "src/services/**",
          "src/stores/**",
          "src/styles/**",
          "src/types/**",
          "src/utils/**",
          "src/views/**",
        ],
        groups: [
          "type",
          "react",
          ["builtin", "external"],
          "internal-type",
          "internal",
          ["parent-type", "sibling-type", "index-type"],
          ["parent", "sibling", "index"],
          "side-effect",
          "style",
          "object",
          "unknown",
        ],
        "custom-groups": {
          value: {
            react: ["react", "**/*react*", "react-*"],
          },
          type: {
            react: "react",
          },
        },
      },
    ],
  },
};
