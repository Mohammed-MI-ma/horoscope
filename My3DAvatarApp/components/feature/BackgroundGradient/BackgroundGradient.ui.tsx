import { LinearGradient } from "expo-linear-gradient";
import { MotiView } from "moti";
import React, { useMemo } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { StarLayer } from "./StarLayer";

interface BackgroundGradientUIProps {
  windowWidth: number;
  windowHeight: number;
  gradients: { isActive: boolean; colors: any }[];
  loadedAssets: any;
  children?: React.ReactNode;
}

export const BackgroundGradientUI: React.FC<BackgroundGradientUIProps> = ({
  windowWidth,
  windowHeight,
  gradients,
  loadedAssets,
  children,
}) => {

  // Memoized container style for gradient
  const gradientStyle: ViewStyle = useMemo(
    () => ({ width: windowWidth, height: windowHeight }),
    [windowWidth, windowHeight]
  );
  return (
    <View style={styles.container}>
      {gradients.map((grad, idx) => (
        <MotiView
          key={idx}
          from={{ opacity: grad.isActive ? 0 : 1 }}
          animate={{ opacity: grad.isActive ? 1 : 0 }}
          transition={{ type: "timing", duration: 1000 }}
          style={StyleSheet.absoluteFill}
        >
          <LinearGradient
            colors={grad.colors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={gradientStyle} // reused memoized style
          />
        </MotiView>
      ))}

      <StarLayer loadedAssets={loadedAssets} windowWidth={windowWidth} windowHeight={windowHeight} />


      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, position: "relative" },
});
