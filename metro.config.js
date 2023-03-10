// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

module.exports = {
  resolver: {
    extraNodeModules: require("expo-crypto-polyfills"),
  },
};
