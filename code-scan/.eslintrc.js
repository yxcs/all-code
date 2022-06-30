module.exports = {
  extends: [
    "eslint-config-ali",
    "plugin:vue/recommended",
    "prettier",
    "plugin:prettier/recommended",
  ],
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "babel-eslint",
    sourceType: "module",
  },
  rules: {
    "prettier/prettier": "error",
  },
  plugins: ["react", "vue", "prettier"],
  globals: {
    React: "readable",
    Vue: "readable",
  },
};
