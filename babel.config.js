module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      "react-native-reanimated/plugin",
      [
        'module-resolver',
        {
          root: ['./src'],
          extesions: [
            '.ts',
            '.tsx',
            '.js',
            '.json',
          ],
          alias: {
            '@pages: ': './src/pages',
            '@components': './src/components',
            '@hooks': './src/hooks',
            '@assets': './src/assets',
          }
        }
      ]
    ],
  };
};
