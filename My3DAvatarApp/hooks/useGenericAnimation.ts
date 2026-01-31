// hooks/useGenericAnimation.ts
import { useEffect, useRef } from "react";
import { Audio } from "expo-av";
import  { useSharedValue, useAnimatedReaction, runOnJS, withTiming } from "react-native-reanimated";

export function useGenericAnimation(animationJson: any, onFinish?: () => void) {
  const progress = useSharedValue<number>(0);
  const totalDuration = (animationJson.op - animationJson.ip) / animationJson.fr;

  // Audio management
  const soundRefs = useRef<{ [key: string]: Audio.Sound }>({});
  const playSound = (name: string) => {
    const sound = soundRefs.current[name];
    if (!sound) return;
    sound.replayAsync().catch(() => {});
  };

  useEffect(() => {
    Audio.setAudioModeAsync({ playsInSilentModeIOS: true, shouldDuckAndroid: false });

    const loadSounds = async () => {
      const sound = new Audio.Sound();
      await sound.loadAsync(require("../assets/audios/BlinkSound.mp3"));
      soundRefs.current.blinking = sound;
    };
    loadSounds();

    return () => {
      Object.values(soundRefs.current).forEach((s) => s.unloadAsync());
    };
  }, []);

  // Markers optimization
  const pendingMarkers = useRef(animationJson.markers ? [...animationJson.markers].sort((a,b)=>a.tm-b.tm) : []);

  useAnimatedReaction(
    () => progress.value,
    (value) => {
      if (!value) return;
      while (pendingMarkers.current.length && value >= pendingMarkers.current[0].tm / totalDuration) {
        const marker = pendingMarkers.current.shift();
        runOnJS(playSound)(marker.cm);
      }
    }
  );

  // Start animation and handle finish
  useEffect(() => {
    progress.value = withTiming(
      1,
      { duration: totalDuration * 1000 },
      (isFinished) => {
        if (isFinished && onFinish) {
          runOnJS(onFinish)();
        }
      }
    );
  }, []);

  return { progress };
}
