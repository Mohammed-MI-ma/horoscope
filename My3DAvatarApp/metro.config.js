// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// ✅ Use react-native-svg-transformer for .svg files
config.transformer.babelTransformerPath = require.resolve("react-native-svg-transformer");

// ✅ Remove 'svg' from asset extensions (so it's handled as source)
config.resolver.assetExts = config.resolver.assetExts.filter(ext => ext !== "svg");

// ✅ Add 'svg' to source extensions
config.resolver.sourceExts.push("svg");

// ✅ (Optional) ensure common formats remain supported
if (!config.resolver.assetExts.includes("webp")) config.resolver.assetExts.push("webp");
if (!config.resolver.assetExts.includes("ttf")) config.resolver.assetExts.push("ttf");
if (!config.resolver.assetExts.includes("otf")) config.resolver.assetExts.push("otf");

module.exports = config;
