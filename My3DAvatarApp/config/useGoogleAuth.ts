import { useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { ENV } from "@/config/env";

WebBrowser.maybeCompleteAuthSession();

export function useGoogleAuth() {
  // Use the proper clientId for Expo Go / Android
  const clientId = ENV.IS_DEV
    ? ENV.GOOGLE_CLIENT_ID
    : ENV.GOOGLE_ANDROID_CLIENT_ID;

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId,
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      console.log("Google Access Token:", authentication?.accessToken);
    }
  }, [response]);

  return { request, response, promptAsync };
}
