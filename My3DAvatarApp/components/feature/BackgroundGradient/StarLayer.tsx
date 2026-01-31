// src/components/feature/BackgroundGradient/StarLayer.tsx
import React, { useEffect } from "react";
import { Image, ImageStyle } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

interface StarLayerProps {
  loadedAssets: { stars: string };
  windowWidth: number;
  windowHeight: number;
}

function StarLayer({ loadedAssets, windowWidth, windowHeight }: StarLayerProps) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(0.1);

  useEffect(() => {
    translateX.value = withRepeat(
      withSequence(
        withTiming(20, { duration: 4000 }),
        withTiming(-20, { duration: 4000 })
      ),
      -1,
      true
    );

    translateY.value = withRepeat(
      withSequence(
        withTiming(10, { duration: 3000 }),
        withTiming(-10, { duration: 3000 })
      ),
      -1,
      true
    );

    opacity.value = withRepeat(
      withSequence(
        withTiming(0.05, { duration: 1000 }),
        withTiming(0.15, { duration: 1000 })
      ),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle<ImageStyle>(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: 1.2 },
    ],
    opacity: opacity.value,
  }));

  return (
    <Animated.Image
      source={{ uri: loadedAssets.stars }}
      style={[
        { width: windowWidth, height: windowHeight, position: "absolute", top: 0, left: 0 },
        animatedStyle,
      ]}
      resizeMode="contain"
    />
  );
}

// ✅ Make it default export
export default StarLayer;
