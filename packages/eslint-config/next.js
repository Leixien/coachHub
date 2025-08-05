module.exports = {
  extends: ["./base.js", "eslint:recommended", "@typescript-eslint/recommended", "next/core-web-vitals", "prettier"],
  plugins: ["react", "react-hooks"],
  rules: {
    "react/react-in-jsx-scope": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "@next/next/no-html-link-for-pages": "off",
  },
  env: {
    browser: true,
  },
};
