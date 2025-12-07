import { MotiImage } from "moti";
import React, { useEffect } from "react";
import { useSharedValue, withRepeat, withSequence, withTiming } from "react-native-reanimated";

export const StarLayer = ({ loadedAssets, windowWidth, windowHeight }) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(0.1);

  // Horizontal floating
  useEffect(() => {
    translateX.value = withRepeat(
      withSequence(
        withTiming(20, { duration: 4000 }),
        withTiming(-20, { duration: 4000 })
      ),
      -1,
      true
    );

    // Vertical floating
    translateY.value = withRepeat(
      withSequence(
        withTiming(10, { duration: 3000 }),
        withTiming(-10, { duration: 3000 })
      ),
      -1,
      true
    );

    // Twinkle opacity
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.05, { duration: 1000 }),
        withTiming(0.15, { duration: 1000 })
      ),
      -1,
      true
    );
  }, []);

  return (
    <MotiImage
      source={{ uri: loadedAssets.stars }}
      style={{
        width: windowWidth,
        height: windowHeight,
        position: "absolute",
        top: 0,
        left: 0,
        transform: [
          { translateX: translateX.value },
          { translateY: translateY.value },
          { scale: 1.2 },
        ],
      }}
      from={{ opacity: 0 }}
      animate={{ opacity: opacity.value }}
      resizeMode="contain"
    />
  );
};
