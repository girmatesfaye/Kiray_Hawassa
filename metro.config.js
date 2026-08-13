const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// Block Metro watcher from watching agent skills and hidden agent folders
config.resolver.blockList = [
  /.*\.agents\/.*/,
  /.*\.claude\/.*/,
  /.*\.kilo\/.*/,
];

module.exports = withNativeWind(config, { input: "./global.css" });
