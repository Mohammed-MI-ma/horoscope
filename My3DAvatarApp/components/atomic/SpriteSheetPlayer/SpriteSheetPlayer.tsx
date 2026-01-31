import React, { useEffect } from "react";
import { View, Dimensions, ImageSourcePropType } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  runOnJS,
} from "react-native-reanimated";

interface SpriteSheetPlayerProps {
  imageSource: ImageSourcePropType; // PNG sprite sheet
  jsonData: any; // TexturePacker JSON
  fps?: number; // animation speed
  loop?: boolean; // repeat animation
  onFinish?: () => void;
}

const SpriteSheetPlayer = ({
  imageSource,
  jsonData,
  fps = 24,
  loop = true,
  onFinish,
}: SpriteSheetPlayerProps) => {
  const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

  // Extract frames from JSON
  const frames = Object.values(jsonData.frames).map((f: any) => ({
    x: f.frame.x,
    y: f.frame.y,
    w: f.frame.w,
    h: f.frame.h,
  }));

  const totalFrames = frames.length;
  const progress = useSharedValue(0);

  // Base frame size (first frame)
  const baseWidth = frames[0].w;
  const baseHeight = frames[0].h;

  // Scale to cover the screen completely (might crop edges)
  const scale = Math.max(screenWidth / baseWidth, screenHeight / baseHeight);

  useEffect(() => {
    const animate = () => {
      progress.value = withTiming(
        totalFrames - 1,
        {
          duration: (totalFrames / fps) * 1000,
          easing: Easing.linear,
        },
        (finished) => {
          if (finished) {
            if (loop) {
              progress.value = 0;
              animate(); // restart animation
            } else if (onFinish) {
              runOnJS(onFinish)(); // ✅ properly call JS callback
            }
          }
        },
      );
    };
    animate();
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    const frameIndex = Math.floor(progress.value);
    const frame = frames[frameIndex];

    // Compute scale for this specific frame
    const scaleX = screenWidth / frame.w;
    const scaleY = screenHeight / frame.h;
    const scale = Math.max(scaleX, scaleY);

    const scaledWidth = frame.w * scale;
    const scaledHeight = frame.h * scale;

    // Log frame info: index, original size, scaled size, starting position in big image
    console.log(
      `Frame ${frameIndex}: original (${frame.w}x${frame.h}) → scaled (${scaledWidth.toFixed(
        0,
      )}x${scaledHeight.toFixed(0)}), start position in sprite sheet: (${frame.x}, ${frame.y})`,
    );

    return {
      width: scaledWidth,
      height: scaledHeight,
      transform: [
        { translateX: -frame.x * scale },
        { translateY: -frame.y * scale },
      ],
    };
  });

  return (
    <View
      style={{ width: screenWidth, height: screenHeight, overflow: "hidden" }}
    >
      <Animated.Image
        source={imageSource}
        style={[animatedStyle, { position: "absolute", left: 0, top: 0 }]}
        resizeMode="contain"
      />
    </View>
  );
};

export default SpriteSheetPlayer;
