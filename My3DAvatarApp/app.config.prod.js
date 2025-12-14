// app.config.prod.ts
export default {
  expo: {
    name: "My3DAvatarApp",
    slug: "my3davatarapp",
    scheme: "my3davatarapp",
    version: "1.0.0",
    extra: {
      APP_ENV: "production",
      GOOGLE_CLIENT_ID: "489966643652-your-web-client-id.apps.googleusercontent.com",
      GOOGLE_ANDROID_CLIENT_ID: "489966643652-your-android-client-id.apps.googleusercontent.com",
      RECAPTCHA_SITE_KEY: "PROD_SITE_KEY",
      RECAPTCHA_SECRET: "PROD_SECRET",
      API_URL: "http://192.168.11.130:5000",
      APP_SCHEME: "my3davatarapp",
      eas: {
        projectId: "25b60143-817e-4b1c-951d-9aedc28c6742", // Ensure projectId is included
      },
    }
  }
};
