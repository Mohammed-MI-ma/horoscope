import React from "react";
import Animated, {
  interpolate,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

type Props = {
  visible: boolean;
  duration?: number;
  type?: "fade" | "slide" | "scale";
  children: React.ReactNode;
};

export const ExitWrapper = ({
  visible,
  duration = 250,
  type = "fade",
  children,
}: Props) => {
  const animatedStyle = useAnimatedStyle(() => {
    const progress = withTiming(visible ? 1 : 0, { duration });
    return {
      opacity: progress,
      transform:
        type === "slide"
          ? [{ translateY: interpolate(progress, [0, 1], [20, 0]) }]
          : type === "scale"
          ? [{ scale: interpolate(progress, [0, 1], [0.9, 1]) }]
          : [],
    };
  });

  return (
    <Animated.View
      style={[
        { flex: 1, width: "100%", height: "100%" }, // ✅ make sure it has size
        animatedStyle,
      ]}
    >
      {children}
    </Animated.View>
  );
};
