// app.config.dev.ts
export default {
  expo: {
    name: "My3DAvatarApp (Dev)",
    slug: "my3davatarapp-dev",
    scheme: "my3davatarapp-dev",
    version: "1.0.0",
     android: {
      package: "com.mohammedmi.my3davatarappdev" // <- unique package name
    },
    extra: {
      APP_ENV: "development",
      GOOGLE_CLIENT_ID:
        "489966643652-your-web-client-id.apps.googleusercontent.com",
      GOOGLE_ANDROID_CLIENT_ID:
        "489966643652-your-android-client-id.apps.googleusercontent.com",
      RECAPTCHA_SITE_KEY: "6Ld6jycsAAAAAGQdi3e98HBnVho-GvHJ6KJLAN5V",
      RECAPTCHA_SECRET: "6Ld6jycsAAAAACPAFQDdvLueontZCXalgInPkvIL",
      API_URL: "http://192.168.11.104:5000",
      APP_SCHEME: "my3davatarapp-dev",
      eas: {
        projectId: "25b60143-817e-4b1c-951d-9aedc28c6742", // Ensure projectId is included
      },
    },
  },
};
