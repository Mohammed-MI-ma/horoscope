import { LinearGradient } from "expo-linear-gradient";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";

export const ShimmerPlaceholder: React.FC<{ width: number; height: number; borderRadius?: number }> = ({
  width,
  height,
  borderRadius = 16,
}) => {
  const progress = useSharedValue(-1);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, { duration: 700, easing: Easing.linear }),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: progress.value * width * 1.5 }],
  }));

  return (
    <Animated.View
      style={{
        width,
        height,
        borderRadius,
        overflow: "hidden",
        backgroundColor: "#e0e0e0",
      }}
    >
      <Animated.View style={[StyleSheet.absoluteFill, animatedStyle]}>
        <LinearGradient
          colors={["#e0e0e0", "#f5f5f5", "#e0e0e0"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ width: width * 0.7, height: "100%" }}
        />
      </Animated.View>
    </Animated.View>
  );
};
