import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";

interface GradientShimmerProps {
  width: number;
  height: number;
  borderRadius?: number;
  colors?: string[]; // your gradient colors
  duration?: number; // wave speed
}

export const GradientShimmer = ({
  width,
  height,
  borderRadius = 10,
  colors = ["#e0e0e0", "#f5f5f5", "#e0e0e0"],
  duration = 600, // faster = smaller number
}: GradientShimmerProps) => {
  const progress = useSharedValue(-1);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, { duration, easing: Easing.linear }),
      -1,
      false
    );
  }, [duration]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: progress.value * width * 1.5 }],
  }));

  return (
    <View style={[styles.container, { width, height, borderRadius }]}>
      <Animated.View style={[StyleSheet.absoluteFill, animatedStyle]}>
        <LinearGradient
          colors={colors} // ✅ gradient applied here
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ width: width * 0.7, height: "100%" }}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    backgroundColor: "#e0e0e0",
  },
});
