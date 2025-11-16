import { useRTL } from "@/contexts/RTLContext";
import type { TFunction } from "i18next";
import React, { useTransition } from "react";
import { useTranslation } from "react-i18next";
import { Image, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

import GlobalStatusBar from "@/components/atomic/GlobalStatusBar/GlobalStatusBar";
import PopUpEarth from "@/components/atomic/PopUpEarth/PopUpEarth ";
import BackgroundGradient from "@/components/feature/BackgroundGradient/BackgroundGradient";
import { useAssets } from "@/contexts/AssetsContext";
import { useAppFont } from "@/hooks/useAppFont";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";
import { MotiView } from "moti";
import { Button } from "native-base";
import Animated from "react-native-reanimated";

import MCIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { styles } from "./welcomeScreen.styles";
// Types
interface WelcomeScreenProps {
  navigation: {
    navigate: (screen: string) => void;
  };
}

export default function WelcomeScreen({ navigation }: WelcomeScreenProps) {
  const { t }: { t: TFunction } = useTranslation();
  const language = useSelector((state: any) => state.application.language);
  const isArabic = language === "ar";
  const { isRtl: isRTL } = useRTL();
  const [isPending, startTransition] = useTransition();
  const fontFamily = useAppFont();
  const boldFont = useAppFont("bold");

  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  // Handle navigation on press
  const handlePress = () => {
    startTransition(() => {
      navigation.navigate("OnBoardingScreen"); // match exit duration
    });
  };

  const { loadedAssets } = useAssets();
  if (!loadedAssets) return null; // still loading

  return (
     <MotiView
      from={{ opacity: 0.75 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0.75 }}
      transition={{ duration: 350, type: "timing" }}
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
              top: 0,
              left: 0,
          
              transform: [{ translateY: 40 }],
            }}
          />

          <View
            style={{
              padding: 20,
              flex: 1,
              justifyContent: "flex-end",
              alignItems: "center",
              position: "relative",
            }}
          >
            <View style={{ alignItems: "center" }}>

              <Animated.Image
                source={{ uri: loadedAssets.logo }}
                style={[{ width: 75, height: 32 }]}
                resizeMode="contain"
              />    

              <Text
                style={{
                  color: "white",
                  fontSize: 30,
                  fontFamily: boldFont,
                  textAlign: "center",
                  width: "100%",
                  maxWidth: 275,
                }}
              >
                {t("welcomePage.title")}</Text>
              <Text
                style={{
                  color: "white",
                  fontSize: 12,
                  fontFamily: fontFamily,
                  textAlign: "center",
                  width: "100%",
                  maxWidth: 275,
                }}
              >
                {t("welcomePage.subtitle")}</Text>



              <Image
                source={{ uri: loadedAssets.planet1 }}
                resizeMode="contain"
                style={{
                  width: 75,
                  height: 75,
                  position: "absolute",
                  top: 0,
                  left: 0,
                  transform: [{ translateY: -30 }],
                }}
              />
            </View>
            <Image
              source={{ uri: loadedAssets.planet1 }}
              resizeMode="contain"
              style={{
                width: 75,
                height: 75,
                position: "absolute",
                top: 0,
                right: 0,
                transform: [{ translateY: 100 }],
              }}
            />
          </View>
         <PopUpEarth uri={loadedAssets.earth} width={windowWidth} />

          <Button
            onPress={handlePress}
            bg={"white"}
            _text={{ color: "black" }}
            style={{
              borderRadius: 100,
              width: 70,
              height: 70,
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              bottom: 20,
              left: 0,
              transform: [{ translateX: -windowWidth/2+35 }],
              zIndex: 9999,
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.5)",
            }}
          >
            <MCIcon name={"arrow-right"} size={25} color={"black"} />
          </Button>
        </BackgroundGradient>
      </SafeAreaView>
    </SafeAreaProvider></MotiView>
  );
}
