module.exports = {
  presets: [
      "@babel/env",
      "@babel/react",
      "@babel/preset-typescript"
  ],
  plugins: [
      require("dw-mx-babel-plugin-auto-css-modules"),
      "@babel/plugin-proposal-class-properties",
      "@babel/plugin-syntax-dynamic-import",
      ["@babel/plugin-proposal-decorators", { "legacy": true }],
      "@babel/plugin-syntax-object-rest-spread",
      "@babel/plugin-transform-runtime",
      "react-hot-loader/babel"
  ],
};
