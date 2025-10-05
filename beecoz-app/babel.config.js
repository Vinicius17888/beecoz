module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    // plugins: []  // nada aqui; o plugin do router é desnecessário no SDK 54
  };
};

