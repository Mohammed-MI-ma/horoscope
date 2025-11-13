// src/utils/initializeI18n.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Localization from "expo-localization";
import i18n, { InitOptions } from "i18next";
import { initReactI18next } from "react-i18next";

import arTranslations from "../i18n/ar/translation.json";
import frTranslations from "../i18n/fr/translation.json";

const STORAGE_KEY = "user-language";

// ✅ Properly typed language detector
const languageDetector = {
  type: "languageDetector",
  async: true,
  detect(callback: (lang: string) => void, _options?: any) {
    // <-- Ajout du 2e argument
    console.log("[i18n] detect called");
    AsyncStorage.getItem(STORAGE_KEY)
      .then((savedLang) => {
        console.log("[i18n] detect savedLang:", savedLang);
        if (savedLang) {
          callback(savedLang);
          return;
        }
        const deviceLang = Localization.getLocales()[0]?.languageCode || "ar";
        console.log("[i18n] detect deviceLang:", deviceLang);
        callback(
          deviceLang === "ar" || deviceLang === "fr" ? deviceLang : "ar"
        );
      })
      .catch((err) => {
        console.warn("[i18n] detect error:", err);
        callback("ar");
      });
  },
  init: () => {},
  cacheUserLanguage: async (lng: string) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, lng);
    } catch (error) {
      console.warn("[i18n] Failed to cache user language:", error);
    }
  },
} as any;

const options: InitOptions = {
  resources: {
    ar: { translation: arTranslations },
    fr: { translation: frTranslations },
  },
  lng: "ar", // Default language
  fallbackLng: "ar",
  supportedLngs: ["ar", "fr"],
  debug: __DEV__,
  interpolation: {
    escapeValue: false, // React already escapes
  },
  react: {
    useSuspense: false,
  },
  returnEmptyString: false,
  saveMissing: true,
  missingKeyHandler: (lng, ns, key) => {
    if (__DEV__) {
      //console.warn(`[i18n] Missing translation key: "${key}" for "${lng}"`);
    }
  },
};

// eslint-disable-next-line import/no-named-as-default-member
i18n.use(languageDetector).use(initReactI18next).init(options);

export default i18n;
