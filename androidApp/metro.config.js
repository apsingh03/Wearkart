// const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

// /**
//  * Metro configuration
//  * https://reactnative.dev/docs/metro
//  *
//  * @type {import('metro-config').MetroConfig}
//  */
// const config = {};

// module.exports = mergeConfig(getDefaultConfig(__dirname), config);

const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

const config = (async () => {
  const defaultConfig = await getDefaultConfig(__dirname);

  // Filter asset extensions to exclude 'svg'
  const assetExts = defaultConfig.resolver.assetExts.filter(
    ext => ext !== 'svg',
  );

  return mergeConfig(defaultConfig, {
    transformer: {
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
    },
    resolver: {
      assetExts: assetExts, // Exclude SVG from asset extensions
      sourceExts: [...defaultConfig.resolver.sourceExts, 'svg'], // Add SVG as a source extension
    },
  });
})();

module.exports = config;
