module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      ["module-resolver", {
        root: ["./app"],
        alias: {
          "@components": "./app/components",
          "@lib": "./app/lib",
          "@theme": "./app/theme/theme",
          "@assets": "./app/assets"
        },
        extensions: [".tsx", ".ts", ".js", ".jsx", ".json"]
      }]
    ]
  };
};
