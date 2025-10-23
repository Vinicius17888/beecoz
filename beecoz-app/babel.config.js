module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      ["module-resolver", {
        alias: {
          "@components": "./app/components",
          "@lib": "./app/lib",
          "@theme": "./app/theme",
          "@assets": "./assets"            // <<-- novo alias
        }
      }]
    ]
  };
};
