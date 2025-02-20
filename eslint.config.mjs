import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat();

const eslintConfig = [
  ...compat.extends("next/core-web-vitals"),
  {
    rules: {
      "import/no-anonymous-default-export": "off",
    },
  },
];

export default eslintConfig;
