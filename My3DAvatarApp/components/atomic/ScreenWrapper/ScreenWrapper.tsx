import { useAssets } from "@/contexts/AssetsContext";
import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export const ScreenWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { loadedAssets } = useAssets();

  if (!loadedAssets) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return <>{children}</>;
};

const styles = StyleSheet.create({
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
});
