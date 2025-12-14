import React, { useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";
import { ENV } from "@/config/env";

type RecaptchaResponse = {
  success: boolean;
  data?: any;
  error?: string;
};

type RecaptchaProps = {
  onVerify: (response: RecaptchaResponse) => void;
  maxRetries?: number;
};

export const RecaptchaComponent = ({
  maxRetries = 3,
  onVerify,
}: RecaptchaProps) => {
  const { width } = useWindowDimensions();
  const webviewRef = useRef<WebView>(null);
  const [webviewHeight, setWebviewHeight] = useState(200); // default height
  const [reloadKey, setReloadKey] = useState(0);
  const [retryCount, setRetryCount] = useState(0);
  // Send token to backend verification endpoint
  const verifyToken = async (token: string, retry = 0) => {
    if (!token) return;

    try {
      const res = await fetch(`${ENV.API_URL}/public/verify-recaptcha`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      // Check HTTP status first
      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }

      // Parse JSON safely
      let data;
      try {
        data = await res.json();
      } catch (jsonErr) {
        throw new Error("Invalid JSON from backend");
      }

      // Pass backend response to parent
      onVerify(data);
    } catch (err: any) {
      console.warn(`Recaptcha verification failed: ${err.message}`);

      // Retry only for network/server errors
      if (retry < maxRetries) {
        setTimeout(() => verifyToken(token, retry + 1), 2000);
      } else {
        onVerify({
          success: false,
          error: err.message || "Recaptcha verification failed",
        });
      }
    }
  };

  return (
    <View style={styles.container}>
      <WebView
        key={reloadKey} // changing key forces re-render/reload
        ref={webviewRef}
        originWhitelist={["*"]} // replace "*" with your domain in production
        source={{ uri: `${ENV.API_URL}/public/recaptcha.html` }}
        onMessage={(event) => {
          try {
            const payload = JSON.parse(event.nativeEvent.data);

            if (payload.type === "height" && payload.height) {
              setWebviewHeight(payload.height); // dynamically adjust height
            } else if (payload.success && payload.token) {
              verifyToken(payload.token);
            } else if (payload.error) {
              console.error("Recaptcha error:", payload.error);
            }
          } catch (err) {
            console.error("Failed to parse recaptcha message:", err);
          }
        }}
        onError={() => {
          if (retryCount < maxRetries) {
            console.warn(
              `Recaptcha WebView failed, retrying... (${retryCount + 1})`
            );
            setRetryCount(retryCount + 1);
            setReloadKey(reloadKey + 1); // reload WebView
          } else {
            console.error("Recaptcha failed to load after max retries");
            onVerify({
              success: false,
              error: "Recaptcha failed to load",
            });
          }
        }}
        javaScriptEnabled
        domStorageEnabled
        startInLoadingState
        mixedContentMode="always"
        style={{ width, height: webviewHeight }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 400,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    overflow: "hidden",
  },
});
