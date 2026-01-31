import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback } from "react";
import { Dimensions, ImageStyle } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from "react-native-reanimated";

const { height: screenHeight } = Dimensions.get("window");

interface SlideInEarthProps {
  uri: string;
  width: number;
  onRemove?: () => void; // optional callback when sliding out
}

function SlideInEarth({ uri, width, onRemove }: SlideInEarthProps) {
  const translateY = useSharedValue(screenHeight);

  // Slide in when screen is focused
  useFocusEffect(
    useCallback(() => {
      translateY.value = withSpring(0, {
        damping: 12,
        stiffness: 10,
        mass: 1,
      });

      return () => {
        // Slide out when leaving the screen
        translateY.value = withSpring(
          screenHeight,
          {
            damping: 12,
            stiffness: 10,
            mass: 1,
          },
          () => {
            // optional: notify parent that the earth can be removed
            if (onRemove) runOnJS(onRemove)();
          }
        );
      };
    }, [translateY, onRemove])
  );

  const animatedStyle = useAnimatedStyle<ImageStyle>(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.Image
      source={{ uri }}
      resizeMode="cover"
      style={[
        {
          width,
          height: 200,
          position: "absolute",
          bottom: 0,
        },
        animatedStyle,
      ]}
    />
  );
}

export default React.memo(SlideInEarth);
