import { useRTL } from "@/contexts/RTLContext";
import { useAppFont } from "@/hooks/useAppFont";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";
import { useEffect, useTransition } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

// AUDIO ENGINE
import { audioEngine } from "@/audio/AudioEngine";
import { soundRegistry } from "@/audio/soundRegistry";

export const useWelcomeScreenController = (navigation: any) => {
  const { t } = useTranslation();
  const language = useSelector((state: any) => state.application.language);
  const isArabic = language === "ar";

  const { isRtl } = useRTL();
  const [isPending, startTransition] = useTransition();

  const fontFamily = useAppFont();
  const boldFont = useAppFont("bold");
  const { width, height } = useWindowDimensions();

  // -----------------------------------------------------
  // LOAD & PLAY AUDIO
  // -----------------------------------------------------
  useEffect(() => {
    let isMounted = true;

    async function setupAudio() {
      // 1. Initialize audio mode (important for iOS/Android)
      await audioEngine.initAudioMode();

      // 2. Preload sounds
      await audioEngine.preload("welcomeMusic", soundRegistry.welcomeMusic);
      console.log("✅ welcomeMusic preloaded");

      // 3. Play welcome music once mounted
      await audioEngine.playMusic("welcomeMusic");
    }

    setupAudio();

    return () => {
      isMounted = false;
      audioEngine.unloadAll(); // Cleanup when leaving screen
    };
  }, []);

  // -----------------------------------------------------
  // PRESS HANDLER
  // -----------------------------------------------------
  const handlePress = () => {
    audioEngine.sfx("click");
    startTransition(() => {
      navigation.navigate("OnBoardingScreen");
    });
  };

  return {
    t,
    isArabic,
    isRtl,
    isPending,
    width,
    height,
    fontFamily,
    boldFont,
    handlePress,
  };
};
