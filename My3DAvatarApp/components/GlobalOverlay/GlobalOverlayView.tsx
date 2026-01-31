import React, { memo, useEffect, useMemo, useRef } from "react";
import {
  Text,
  View,
  useWindowDimensions,
  AccessibilityInfo,
  findNodeHandle,
} from "react-native";
import Animated, { SlideInUp, ZoomIn } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./GlobalOverlayView.styles";
import PleaseLoginAnimation from "../atomic/Animations/PleaseLoginAnimation/PleaseLoginAnimation";
import { useGlobalOverlayController } from "./useGlobalOverlayController";
import { welcome_Assets } from "@/images";
import { useAssets } from "@/contexts/AssetsContext";

const GlobalOverlayView = memo(() => {
  const { width } = useWindowDimensions();
  const overlay = useGlobalOverlayController();

  const cardStyle = useMemo(() => [styles.card, { width }], [width]);

  const cardRef = useRef<View>(null);
  const { loadedAssets } = useAssets() as {
    loadedAssets: typeof welcome_Assets;
  };
  // Accessibility focus after the view is mounted
  useEffect(() => {
    if (!overlay.isVisible || overlay.type !== "locked") return;

    const handle = cardRef.current ? findNodeHandle(cardRef.current) : null;

    if (handle) {
      // Delay slightly to ensure Animated.View is mounted
      const timeout = setTimeout(() => {
        AccessibilityInfo.setAccessibilityFocus(handle);
      }, 100);

      return () => clearTimeout(timeout);
    }
  }, [overlay.isVisible, overlay.type]);

  if (!overlay.isVisible) return null;
  return (
    <Animated.View
      entering={SlideInUp.duration(180)}
      style={styles.overlay}
      pointerEvents="auto"
      accessibilityViewIsModal
      importantForAccessibility="yes"
    >
      <SafeAreaView style={styles.container}>
        {overlay.type === "pleaseLoginAnimation" && (
          <PleaseLoginAnimation
            animationJson={loadedAssets.pleaseLoginLottie}
          />
        )}

        {overlay.type === "locked" && (
          <Animated.View
            entering={ZoomIn.springify().damping(18).stiffness(120)}
            style={cardStyle}
            accessibilityRole="alert"
            accessibilityLabel="Action required. Complete your profile to continue."
          >
            <View ref={cardRef}>
              <Text style={styles.lockIcon} accessibilityElementsHidden>
                🔒
              </Text>

              <Text style={styles.title}>Action Required</Text>

              <Text style={styles.text}>Complete your profile to continue</Text>
            </View>
          </Animated.View>
        )}
      </SafeAreaView>
    </Animated.View>
  );
});

GlobalOverlayView.displayName = "GlobalOverlayView";

export default GlobalOverlayView;
