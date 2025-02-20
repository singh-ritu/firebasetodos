import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals"),
  {
    languageOptions: {
      ecmaVersion: "latest", // Ensures compatibility with modern JS features
      sourceType: "module", // Enables ES Modules support
    },
    rules: {
      "import/no-anonymous-default-export": "off", // Helps prevent function serialization issues
    },
  },
];
export default eslintConfig;
