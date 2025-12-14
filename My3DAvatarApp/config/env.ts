// src/config/env.ts
import Constants from "expo-constants";

type Extra = {
  APP_ENV?: string;
  GOOGLE_CLIENT_ID?: string;
  GOOGLE_ANDROID_CLIENT_ID?: string;
  RECAPTCHA_SITE_KEY?: string;
  RECAPTCHA_SECRET?: string;
  API_URL?: string;
  APP_SCHEME?: string;
  [k: string]: any;
};

const extra = (Constants.expoConfig?.extra ?? {}) as Extra;

export const ENV = {
  APP_ENV: extra.APP_ENV ?? "development",
  GOOGLE_CLIENT_ID: extra.GOOGLE_CLIENT_ID ?? "",
  GOOGLE_ANDROID_CLIENT_ID: extra.GOOGLE_ANDROID_CLIENT_ID ?? "",
  RECAPTCHA_SITE_KEY: extra.RECAPTCHA_SITE_KEY ?? "",
  RECAPTCHA_SECRET: extra.RECAPTCHA_SECRET ?? "",
  API_URL: extra.API_URL ?? "",
  APP_SCHEME: extra.APP_SCHEME ?? "",
  IS_DEV: (extra.APP_ENV ?? "development") === "development"
} as const;
