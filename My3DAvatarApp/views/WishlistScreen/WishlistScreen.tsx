import { ScreenWrapper } from "@/components/atomic/ScreenWrapper/ScreenWrapper";
import { ExitWrapper } from "@/components/ExitWrapper/ExitWrapper";
import BackgroundGradient from "@/components/feature/BackgroundGradient/BackgroundGradient";
import AnimatedBoard from "@/components/feature/WishlistBoard/WishlistBoard";
import { useThemeColors } from "@/constants/themeUtils";
import { AssetsProvider } from "@/contexts/AssetsContext";
import { useAppFont } from "@/hooks/useAppFont";
import { useBackExit } from "@/hooks/useBackExit";
import { welcome_Assets, wish_Assets } from "@/images";
import { MotiView } from "moti";
import { Toast } from "native-base";
import React from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface WishlistScreenProps {
  navigation: {
    navigate: (screen: string) => void;
  };
}

function WishlistScreenContent({ navigation }: WishlistScreenProps) {
  const { visible } = useBackExit({
    toast: (msg) => Toast.show({ title: msg }),
    duration: 300,
  });
  const { t } = useTranslation();
  const boldFont = useAppFont("bold");
  const fontFamily = useAppFont();
  const { textColor } = useThemeColors();

  return (
    <ScreenWrapper>
      <SafeAreaView style={styles.container}>

        <ExitWrapper visible={visible} type="fade">
          <MotiView
            from={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.8 }}
            transition={{ duration: 300 }}
            style={{ flex: 1 }}
          >
            <BackgroundGradient>
              <AssetsProvider assetsToLoad={wish_Assets}>
                <AnimatedBoard />
              </AssetsProvider>

              <Text
                style={{
                  fontSize: 16,
                  textAlign: "center",
                  color: textColor,
                  fontFamily: boldFont,
                }}
              >
                {t("myDesires")}
              </Text>

              <Text
                style={{
                  fontSize: 10,
                  textAlign: "center",
                  color: textColor,
                  fontFamily: fontFamily,
                }}
              >
                عقوبات مشددة تنتظر مستعملي وسائط التواصل الاجتماعي للطعن في
                الانتخابات...
              </Text>
            </BackgroundGradient>
          </MotiView>
        </ExitWrapper>
      </SafeAreaView>
    </ScreenWrapper>
  );
}

// Wrap the content in its own AssetsProvider
export default function WelcomeScreen(props: WishlistScreenProps) {
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
      <WishlistScreenContent {...props} />
    </AssetsProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
});
