import { Image } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { useSelector, shallowEqual } from "react-redux";
import { RootStateType } from "@/store";
import { useEffect } from "react";

const AnimatedImage = Animated.createAnimatedComponent(Image);

interface LogoProps {
  loadedAssets: { logo?: string; logoD?: string };
  width?: number; // <-- add width
  height?: number; // <-- add height
  isDarkModee: boolean;
}

const Logo: React.FC<LogoProps> = ({
  loadedAssets,
  width = 50,
  height = 20,
  isDarkModee,
}) => {
  const isDarkMode = useSelector(
    (state: RootStateType) => state.application.isDarkMode,
    shallowEqual,
  );
  const isDarkMod = isDarkModee ? isDarkModee : isDarkMode;
  const progress = useSharedValue(isDarkMode ? 1 : 0);

  // Animate opacity on dark mode change
  useEffect(() => {
    progress.value = withTiming(isDarkMod ? 1 : 0, { duration: 400 });
  }, [isDarkMod, progress]);

  // Light logo opacity
  const lightStyle = useAnimatedStyle(() => ({
    opacity: 1 - progress.value,
    position: "absolute",
  }));

  // Dark logo opacity
  const darkStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    position: "absolute",
  }));

  return (
    <Animated.View style={{ width: width, height: height }}>
      <AnimatedImage
        source={{ uri: loadedAssets.logo }}
        style={[{ width: width, height: height }, lightStyle]}
        resizeMode="contain"
      />
      <AnimatedImage
        source={{ uri: loadedAssets.logoD }}
        style={[{ width: width, height: height }, darkStyle]}
        resizeMode="contain"
      />
    </Animated.View>
  );
};

export default Logo;
