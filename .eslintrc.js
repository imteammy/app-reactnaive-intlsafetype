module.exports = {
  extends: ["eslint:recommended", "plugin:react/recommended", "plugin:react-native/all", "plugin:@typescript-eslint/recommended"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    jsx: true,
  },
  parser: "@typescript-eslint/parser",
  rules: {
    "react-native/no-unused-styles": 2,
    "react-native/split-platform-components": 2,
    "react-native/no-inline-styles": "off",
    "react-native/no-color-literals": "off",
    "react-native/no-raw-text": "off",
    "react-native/no-single-element-style-arrays": 2,
    "react/no-unescaped-entities" : 'off'
  },
  plugins: ["react", "react-native"],
  env: {
    browser: true,
    node: true,
    "react-native/react-native": true,
    es6: true,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
