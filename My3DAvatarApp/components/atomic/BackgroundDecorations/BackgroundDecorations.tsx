import { Planet } from "@/types/Planet";
import React, { memo, useEffect } from "react";
import { ImageStyle } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

interface BackgroundDecorationsProps {
  planets: Planet[];
}

const PlanetDecoration = memo(function PlanetDecoration({ planet }: { planet: Planet }) {
  // Random amplitude for X and Y for more natural floating
  const amplitudeX = Math.random() * 10 + 5; // 5 to 15 px
  const amplitudeY = Math.random() * 10 + 5; // 5 to 15 px

  // Random durations for X and Y
  const durationX = 2000 + Math.random() * 2000; // 2s to 4s
  const durationY = 1500 + Math.random() * 1500; // 1.5s to 3s

  const translateX = useSharedValue(Math.random() * amplitudeX - amplitudeX / 2);
  const translateY = useSharedValue(Math.random() * amplitudeY - amplitudeY / 2);

  useEffect(() => {
    translateX.value = withRepeat(
      withSequence(
        withTiming(translateX.value + amplitudeX, { duration: durationX }),
        withTiming(translateX.value - amplitudeX, { duration: durationX })
      ),
      -1,
      true
    );

    translateY.value = withRepeat(
      withSequence(
        withTiming(translateY.value + amplitudeY, { duration: durationY }),
        withTiming(translateY.value - amplitudeY, { duration: durationY })
      ),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle<ImageStyle>(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));

  const style: ImageStyle = { position: "absolute", ...planet.style };

  return (
    <Animated.Image
      source={{ uri: planet.uri }}
      resizeMode="contain"
      style={[style, animatedStyle]}
    />
  );
});

function BackgroundDecorationsComponent({ planets }: BackgroundDecorationsProps) {
  const validPlanets = planets.filter(p => typeof p.uri === "string");

  return (
    <>
      {validPlanets.map((planet, i) => (
        <PlanetDecoration key={i} planet={planet} />
      ))}
    </>
  );
}

export default memo(BackgroundDecorationsComponent);
