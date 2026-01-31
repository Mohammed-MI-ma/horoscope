import React, { memo } from "react";
import { View, ActivityIndicator, Text, StyleSheet } from "react-native";
import { AssetsProvider } from "@/contexts/AssetsContext";
import { welcome_Assets } from "@/images";
import GlobalOverlayView from "./GlobalOverlayView";
import { useGlobalOverlayController } from "./useGlobalOverlayController";

export default function GlobalOverlay() {
  const overlay = useGlobalOverlayController();

  // Do not render unless overlay is active
  if (!overlay.isVisible) return null;
  return (
    <AssetsProvider
      assetsToLoad={welcome_Assets}
      fallback={<AssetsFallback />} // Pass component, not JSX
    >
      <GlobalOverlayView />
    </AssetsProvider>
  );
}

// Memoized fallback for performance
const AssetsFallback = memo(() => (
  <View style={styles.fallback} accessible accessibilityRole="alert">
    <ActivityIndicator size="large" color="#fff" />
    <Text style={styles.fallbackText}>Loading assets…</Text>
  </View>
));

AssetsFallback.displayName = "AssetsFallback";

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000", // safe default background
  },
  fallbackText: {
    marginTop: 12,
    color: "#fff",
    fontSize: 14,
  },
});
