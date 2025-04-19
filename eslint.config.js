import nextPlugin from "@next/eslint-plugin-next";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import globals from "globals";

export default tseslint.config(
  {
    // Global ignores
    ignores: ["node_modules/", ".next/", "public/", "dist/"],
  },
  // Base configuration for all JS/TS files
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "@next/next": nextPlugin, // Ensure plugin is registered
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: true, // Automatically find tsconfig.json
        ecmaFeatures: { jsx: true }, // Enable JSX parsing
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        React: "readonly", // Define React global for JSX transform
      },
    },
    // Apply recommended rule sets FIRST
    extends: [
      tseslint.configs.recommended, // Base TS rules
      // If using type-aware linting (project: true), consider:
      // tseslint.configs.recommendedTypeChecked, 
    ],
    // THEN apply specific rules and overrides
    rules: {
      // Apply React Hooks rules
      ...reactHooks.configs.recommended.rules,
      // Apply Next.js recommended rules (ensure plugin is correctly referenced)
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,

      // --- Your Custom Overrides ---
      "@typescript-eslint/no-explicit-any": "off", // Disable 'any' type errors
      "react-refresh/only-export-components": "off", // Disable fast refresh component export check
      "@typescript-eslint/no-empty-interface": "off", // Allow empty interfaces
      "@typescript-eslint/no-empty-object-type": "off", // Allow empty object types
      "prefer-const": "warn", // Warn instead of error for 'let' vs 'const'
      "@typescript-eslint/no-unused-vars": [ // Warn about unused vars, ignore args starting with _
        "warn", 
        { "argsIgnorePattern": "^_", "varsIgnorePattern": "^_" }
      ], 
      "@typescript-eslint/ban-ts-comment": "off", // Allow ts-ignore comments if needed
      // Add any other specific rule adjustments here
    },
  }
);
