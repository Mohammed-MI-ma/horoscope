import { useRTL } from "@/contexts/RTLContext";
import type { TFunction } from "i18next";
import React, { useState, useTransition } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

import GlobalStatusBar from "@/components/atomic/GlobalStatusBar/GlobalStatusBar";
import BackgroundGradient from "@/components/feature/BackgroundGradient/BackgroundGradient";
import { useAppFont } from "@/hooks/useAppFont";
import { MotiView } from "moti";

import { styles } from "./onBoardingScreen.styles";

import CardGrid from "@/components/atomic/CardGrid/CardGrid";
import { DarkModeToggle } from "@/components/atomic/DarkModeToggle/DarkModeToggle";
import PressableMoti from "@/components/atomic/PressableMoti/PressableMoti";
import GetTipsButton from "@/components/feature/GetTipsButton/controller/GetTipsButtonContoller";
import { useThemeColors } from "@/constants/themeUtils";
import { AssetsProvider, useAssets } from "@/contexts/AssetsContext";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";
import { welcome_Assets } from "@/images";


// Types
interface OnBoardingScreenProps {
  navigation: {
    navigate: (screen: string) => void;
  };
}

function OnBoardingScreenContent({
  navigation,
}: OnBoardingScreenProps) {
  const { t }: { t: TFunction } = useTranslation();
  const language = useSelector((state: any) => state.application.language);
  const isArabic = language === "ar";
  const { isRtl: isRTL } = useRTL();
  const [isPending, startTransition] = useTransition();
  const fontFamily = useAppFont();
  const boldFont = useAppFont("bold");
  const [visible, setVisible] = useState(true);
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const { textColor } = useThemeColors();

  // Consume assets from AssetProvider
  const { loadedAssets } = useAssets() as { loadedAssets: any };

  const handlePress = () => {
    navigation.navigate("WishlistScreen");
  };
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
            <Image
              source={{ uri: loadedAssets.planet1 }}
              resizeMode="contain"
              style={{
                width: 200,
                height: 200,
                position: "absolute",
                top: windowHeight / 2,
                left: -100,
                transform: [{ translateY: 40 }],
              }}
            />

            <View style={{ marginHorizontal: 10, marginVertical: 20 }}>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexDirection: "row",
                  marginBottom: 50,
                }}
              >
                <Image
                  source={{ uri: loadedAssets.logo }}
                  style={[{ width: 50, height: 20 }]}
                  resizeMode="contain"
                />
                <View
                  style={{
                    flexDirection: "row",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <GetTipsButton
                    onPress={() => {
                      console.log("first");
                    }}
                  />
                  <DarkModeToggle />
                </View>
              </View>
              <View style={{ marginTop: 20, marginBottom: 20 }}>
                <Text
                  style={{
                    color: textColor,
                    fontSize: 30,
                    fontFamily: boldFont,
                    textAlign: "center",
                    width: "100%",
                  }}
                >
                  {t("whatWouldYouLike")}
                </Text>
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexDirection: "row",
                  }}
                >
                  <Image
                    source={{ uri: loadedAssets.logo }}
                    style={[{ width: 50, height: 20 }]}
                    resizeMode="contain"
                  />

                  <View
                    style={{
                      flexDirection: "row",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <PressableMoti onPress={handlePress}>
                      <Text
                        style={{
                          fontFamily: boldFont,
                          color: textColor,
                          fontSize: 12,
                          textDecorationLine: "underline",
                        }}
                      >
                        {t("see_more")}
                      </Text>
                    </PressableMoti>
                  </View>
                </View>
              </View>
              <CardGrid />
            </View>
          </BackgroundGradient>
        </SafeAreaView>
    </MotiView>
  );
}
// Wrap the content in its own AssetsProvider
export default function OnBoardingScreen(props: OnBoardingScreenProps) {
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
      <OnBoardingScreenContent {...props} />
    </AssetsProvider>
  );
}
