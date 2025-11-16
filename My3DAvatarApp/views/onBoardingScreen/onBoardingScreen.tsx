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
import { useAssets } from "@/contexts/AssetsContext";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";
import { Button } from "native-base";
import Tips from "../../assets/svg/tips.svg";

// Types
interface OnBoardingScreenProps {
  navigation: {
    navigate: (screen: string) => void;
  };
}

export default function onBoardingScreen({
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
              <GlobalStatusBar />
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
                    <Button
                      style={{
                        borderRadius: 50,
                        boxShadow: "10px 10px 30px rgba(0, 0, 0, 0.3)",
                        height: 40,
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Tips width={25} height={25} style={{ marginTop: 8 }} />
                        <Text
                          style={{
                            fontFamily: boldFont,
                            color: "white",
                            fontSize: 12,
                          }}
                        >
                          {t("GetTips")}
                        </Text>
                      </View>
                    </Button>
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
                            fontSize: 12,textDecorationLine: "underline",
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
