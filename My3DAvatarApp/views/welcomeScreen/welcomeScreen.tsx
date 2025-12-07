// src/screens/WelcomeScreen.tsx
import { MotiView } from "moti";
import { Button } from "native-base";
import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import Animated from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

//_Hooks

import GlobalStatusBar from "@/components/atomic/GlobalStatusBar/GlobalStatusBar";
import BackgroundGradient from "@/components/feature/BackgroundGradient/BackgroundGradient";
import { AssetsProvider, useAssets } from "@/contexts/AssetsContext";

import BackgroundDecorations from "@/components/atomic/BackgroundDecorations/BackgroundDecorations";

//__Types
import { Planet } from "@/types/Planet";

//__Assets
import SlideInEarth from "@/components/atomic/SlideInEarth/SlideInEarth";
import { welcome_Assets } from "@/images";

import MCIcon from "react-native-vector-icons/MaterialCommunityIcons";

//__Styling
import { useThemeColors } from "@/constants/themeUtils";
import { useWelcomeScreenController } from "./WelcomeScreen.controller";
import { styles } from "./welcomeScreen.styles";

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
        width: 200,
        height: 200,
        position: "absolute",
        top: 0,
        left: 0,
        transform: [{ translateY: 40 }],
      },
    },
    {
      uri: loadedAssets.planet1,
      style: {
        width: 75,
        height: 75,
        position: "absolute",
        top: 0,
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
        top: 0,
        right: 0,
        transform: [{ translateY: 100 }],
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
      <SafeAreaView style={styles.container}>
        <GlobalStatusBar backgroundColor="black" />
        <BackgroundGradient>
          <BackgroundDecorations planets={planets} />

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
          <View style={styles.CTAContainer}>
            {/* Pulsing ring beneath button */}
            <MotiView
              from={{ scale: 0.5, opacity: 1 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{ loop: true, type: "timing", duration: 1000 }}
              style={{
                width: 70,
                height: 70,
                borderRadius: 100,
                borderWidth: 2,
                borderColor: "#ffffffff",
                zIndex: 0, // <-- behind the button
              }}
            />
            {/* Actual button */}
            <Button
              onPress={handlePress}
              bg="white"
              style={[
                styles.button,
                {
                  zIndex: 1, // <-- make sure it's above the ring
                },
              ]}
            >
              <MCIcon name="arrow-right" size={25} color="black" />
            </Button>
          </View>

          <SlideInEarth uri={loadedAssets.earth} width={windowWidth} />
        </BackgroundGradient>
      </SafeAreaView>
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
          <Text style={{ marginTop: 12, color: "white" }}>
            Loading assets...
          </Text>
        </View>
      }
    >
      <WelcomeScreenContent {...props} />
    </AssetsProvider>
  );
}
