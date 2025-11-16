// BackgroundGradient.tsx
import { useWindowDimensions } from "@/hooks/useWindowDimensions";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";

interface BackgroundGradientProps {
  loadedAssets: { stars: string };
  children?: React.ReactNode;
}

export default function BackgroundGradient({
  loadedAssets,
  children,
}: BackgroundGradientProps) {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#000008", "#020314", "#04172E", "#0A2F4A"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <Animated.Image
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
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  gradient: {
    flex: 1,
  },
});
