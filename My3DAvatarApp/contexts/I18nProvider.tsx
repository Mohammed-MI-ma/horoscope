// src/providers/I18nProvider.tsx
import * as Updates from "expo-updates";
import React, { useEffect } from "react";
import { I18nManager } from "react-native";
import { useSelector } from "react-redux";
import i18n from "../utils/initializeI18n";

export const I18nProvider = ({ children }: { children: React.ReactNode }) => {
  const language = useSelector((state: any) => state.application.language);

  useEffect(() => {
    const setupLanguage = async () => {
      try {
        await i18n.changeLanguage(language);
      } catch (error) {}

      const shouldBeRTL = language === "ar";
      if (I18nManager.isRTL !== shouldBeRTL) {
        I18nManager.allowRTL(shouldBeRTL);
        I18nManager.forceRTL(shouldBeRTL);
        await Updates.reloadAsync(); // Full reload only when RTL/LTR changes
      }
    };
    setupLanguage();
  }, [language]);

  return <>{children}</>;
};
