/* eslint-disable react-hooks/rules-of-hooks */
import { useRTL } from "@/contexts/RTLContext";
import type { TFunction } from "i18next";
import React, { useState, useTransition } from "react";
import { useTranslation } from "react-i18next";
import { Image, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

import GlobalStatusBar from "@/components/atomic/GlobalStatusBar/GlobalStatusBar";
import BackgroundGradient from "@/components/feature/BackgroundGradient/BackgroundGradient";
import { useAppFont } from "@/hooks/useAppFont";
import { useBackHandler } from "@/hooks/useBackHandler";
import { AnimatePresence, MotiView } from "moti";

import { styles } from "./onBoardingScreen.styles";

import CardGrid from "@/components/atomic/CardGrid/CardGrid";
import { DarkModeToggle } from "@/components/atomic/DarkModeToggle/DarkModeToggle";
import GetTipsButton from "@/components/feature/GetTipsButton/controller/GetTipsButtonContoller";
import { useAssets } from "@/contexts/AssetsContext";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";

// Types
interface OnBoardingScreenProps {
  navigation: {
    navigate: (screen: string) => void;
  };
}

export default function OnBoardingScreen({
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

  const { loadedAssets } = useAssets();
  if (!loadedAssets) return null; // still loading

  // 🔥 Intercept physical back button
  useBackHandler(() => {
    triggerExit();
    return true; // stop default navigation
  });

  const triggerExit = () => {
    setVisible(false);

    // Wait for exit animation to finish
    setTimeout(() => {
      navigation.goBack();
    }, 350); // match exit animation duration
  };
  return (
    <AnimatePresence>
      {visible && (
        <MotiView
          key="screen"
          from={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0.75 }}
          transition={{ duration: 300 }}
          style={{ flex: 1 }}
        >
          <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
              <GlobalStatusBar backgroundColor="black" />
              <BackgroundGradient loadedAssets={loadedAssets}>
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
                        color: "white",
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
                        <Text
                          style={{
                            fontFamily: boldFont,
                            color: "white",
                            fontSize: 12,
                            textDecorationLine: "underline",
                          }}
                        >
                          {t("see_more")}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <CardGrid />
                </View>
              </BackgroundGradient>
            </SafeAreaView>
          </SafeAreaProvider>
        </MotiView>
      )}
    </AnimatePresence>
  );
}
