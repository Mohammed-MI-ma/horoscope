// WelcomeScreen.controller.ts
import { useAssets } from "@/contexts/AssetsContext";
import { useRTL } from "@/contexts/RTLContext";
import { useAppFont } from "@/hooks/useAppFont";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";
import { useTransition } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

export const useWelcomeScreenController = (navigation: any) => {
  const { t } = useTranslation();
  const language = useSelector((state: any) => state.application.language);
  const isArabic = language === "ar";

  const { isRtl } = useRTL();
  const [isPending, startTransition] = useTransition();

  const fontFamily = useAppFont();
  const boldFont = useAppFont("bold");
  const { width, height } = useWindowDimensions();
  const { loadedAssets } = useAssets();

  const handlePress = () => {
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
    loadedAssets,
    handlePress,
  };
};
