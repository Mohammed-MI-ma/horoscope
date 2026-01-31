// src/screens/WelcomeScreen.tsx
import { MotiView } from "moti";
import { Button } from "native-base";
import React, { Suspense } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import Animated from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { ENV } from "@/config/env";

//_Hooks

import BackgroundGradient from "@/components/feature/BackgroundGradient/BackgroundGradient";
import { AssetsProvider, useAssets } from "@/contexts/AssetsContext";

//__Types
import { Planet } from "@/types/Planet";

//__Assets
import { welcome_Assets } from "@/images";

import MCIcon from "react-native-vector-icons/MaterialCommunityIcons";

//__Styling
import { useThemeColors } from "@/constants/themeUtils";
import { useWelcomeScreenController } from "./WelcomeScreen.controller";
import { styles } from "./welcomeScreen.styles";
import { topOffset } from "@/utils/topOffset";
import CTAButton from "@/components/atomic/CTAButton/CTAButton";
// Lazy-loaded non-critical components
const BackgroundDecorations = React.lazy(
  () =>
    import("@/components/atomic/BackgroundDecorations/BackgroundDecorations")
);
const SlideInEarth = React.lazy(
  () => import("@/components/atomic/SlideInEarth/SlideInEarth")
);

// Types
interface WelcomeScreenProps {
  navigation: {
    navigate: (screen: string) => void;
  };
}

function WelcomeScreenContent({ navigation }: WelcomeScreenProps) {
  const {
    t,
    isRtl,
    fontFamily,
    boldFont,
    width: windowWidth,
    handlePress,
  } = useWelcomeScreenController(navigation);
  const { textColor } = useThemeColors();

  // Consume assets from AssetProvider
  const { loadedAssets } = useAssets() as { loadedAssets: any };
  const planets: Planet[] = [
  
    {
      uri: loadedAssets.planet1,
      style: {
        width: 75,
        height: 75,
        position: "absolute",
        top: topOffset(40),
        left: 0,
        transform: [{ translateY: -30 }],
      },
    },
    {
      uri: loadedAssets.planet1,
      style: {
        width: 75,
        height: 75,
        position: "absolute",
        top: topOffset(40),
        right: 0,
        transform: [{ translateY: 100 }],
      },
    },  {
      uri: loadedAssets.planet1,
      style: {
        width: 200,
        height: 200,
        position: "absolute",
        top: topOffset(40),
        left: 0,
        transform: [{ translateY: 40 }],
      },
    },
  ];

  return (
    <MotiView
      from={{ opacity: 0.75 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0.75 }}
      transition={{ duration: 350, type: "timing" }}
      style={{ flex: 1 }}
    >
        <BackgroundGradient>
          <View style={styles.contentWrapper}>
            <View
              style={{
                alignItems: "center",
              }}
            >
              <Animated.Image
                source={{ uri: loadedAssets.logo }}
                style={styles.logo}
              />
              <Text
                style={[
                  styles.title,
                  {
                    color: textColor,
                    fontFamily: boldFont,
                  },
                ]}
              >
                {t("welcomePage.title")}
              </Text>
              <Text
                style={[
                  styles.subtitle,
                  {
                    color: textColor,
                    fontFamily: fontFamily,
                  },
                ]}
              >
                {t("welcomePage.subtitle")}
              </Text>
            </View>
          </View>

          {/**main content  */}
          <CTAButton handlePress={handlePress} />
          {/**not important  content  */}

          {/* Lazy-loaded non-critical content */}
          <Suspense
            fallback={
              <View style={{ flex: 1 }} /> // invisible placeholder
            }
          >
            <BackgroundDecorations planets={planets} />
            <SlideInEarth uri={loadedAssets.earth} width={windowWidth} />
          </Suspense>
        </BackgroundGradient>
    </MotiView>
  );
}

// Wrap the content in its own AssetsProvider
export default function WelcomeScreen(props: WelcomeScreenProps) {
  return (
    <AssetsProvider
      assetsToLoad={welcome_Assets ?? {}}
      fallback={
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#ffffff" />
          <Text style={{ marginTop: 12, color: "white" }}></Text>
        </View>
      }
    >
      <WelcomeScreenContent {...props} />
    </AssetsProvider>
  );
}
