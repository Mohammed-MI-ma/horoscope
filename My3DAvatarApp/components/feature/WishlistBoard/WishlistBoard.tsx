import { ShimmerPlaceholder } from "@/components/atomic/GradientShimmer/ShimmerPlaceholder";
import { useAssets } from "@/contexts/AssetsContext";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";
import { useColorModeValue, useToken } from "native-base";
import React, { useEffect, useState } from "react";

import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const AnimatedBoard: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  const heightAnim = useSharedValue(0);
  const opacityAnim = useSharedValue(0); // << animate opacity also

  const [bgColor] = useToken("colors", [
    useColorModeValue("primary.600", "primary.50"),
  ]);
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();

  const { loadedAssets } = useAssets();
  if (!loadedAssets) return null;

  // Delay then trigger animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setExpanded(true);
      opacityAnim.value = withTiming(1, { duration: 450 });
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    heightAnim.value = withTiming(expanded ? windowHeight / 2 : 0, {
      duration: 600,
      easing: Easing.out(Easing.exp),
    });
  }, [expanded]);

  const animatedStyle = useAnimatedStyle(() => ({
    height: heightAnim.value,
    opacity: opacityAnim.value, // << children fade in with delay
  }));
if (true) {
  return (
    <Animated.View
      style={{
        height: windowHeight / 2,
        width: windowWidth,
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        paddingHorizontal: 10,
      }}
    >
      <ShimmerPlaceholder width={windowWidth} height={windowHeight / 2} />
      
    </Animated.View>
  );
}

};

export default AnimatedBoard;
