import { useWindowDimensions } from "@/hooks/useWindowDimensions";
import { RootStateType } from "@/store";
import { LinearGradient } from "expo-linear-gradient";
import { MotiView } from "moti";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";

interface BackgroundGradientProps {
  loadedAssets: { stars: string };
  children?: React.ReactNode;
}

export default function BackgroundGradient({
  loadedAssets,
  children,
}: BackgroundGradientProps) {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const isDarkMode = useSelector(
    (state: RootStateType) => state.application.isDarkMode
  );

  return (
    <View style={styles.container}>
      {/* Dark Gradient */}
      <MotiView
        from={{ opacity: isDarkMode ? 0 : 1 }}
        animate={{ opacity: isDarkMode ? 1 : 0 }}
        transition={{ type: "timing", duration: 1000 }}
        style={StyleSheet.absoluteFill}
      >
        <LinearGradient
          colors={["#000008", "#000008","#9093c7ff", "#90a5beff", "#87939bff"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ width: windowWidth, height: windowHeight }}
        />
      </MotiView>

      {/* Light Gradient */}
      <MotiView
        from={{ opacity: isDarkMode ? 1 : 0 }}
        animate={{ opacity: isDarkMode ? 0 : 1 }}
        transition={{ type: "timing", duration: 1000 }}
        style={StyleSheet.absoluteFill}
      >
        <LinearGradient
          colors={["#000008","#000008", "#020314", "#2b2d4bff", "#A9D1FF"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ width: windowWidth, height: windowHeight }}
        />
      </MotiView>

      {/* Star overlay */}
      <Image
        source={{ uri: loadedAssets.stars }}
        style={[
          {
            width: windowWidth,
            height: windowHeight,
            position: "absolute",
            top: 0,
            left: 0,
            opacity: 0.1,
            transform: [{ translateX: 20 }, { scale: 1.2 }],
          },
        ]}
        resizeMode="contain"
      />

      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, position: "relative" },
});
