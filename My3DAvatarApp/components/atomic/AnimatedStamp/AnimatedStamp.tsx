import React, { useEffect } from "react";
import { ImageProps } from "react-native";
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withTiming,
} from "react-native-reanimated";

interface AnimatedStampProps extends ImageProps {
  delay: number; // delay before it appears
}

const AnimatedStamp: React.FC<AnimatedStampProps> = ({ delay, style, ...props }) => {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0);

  useEffect(() => {
    opacity.value = withDelay(
      delay+2000,
      withTiming(1, { duration: 600, easing: Easing.out(Easing.exp) })
    );
    scale.value = withDelay(
      delay+2000,
      withTiming(1, { duration: 600, easing: Easing.out(Easing.exp) })
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return <Animated.Image {...props} style={[style, animatedStyle]} />;
};

export default AnimatedStamp;
