// BottomDrawer.tsx
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Checkbox } from "native-base";
import React, { startTransition } from "react";
import { useTranslation } from "react-i18next";
import { Image, Text, View } from "react-native";
import { Portal } from "react-native-portalize";

import PressableMoti from "@/components/atomic/PressableMoti/PressableMoti";
import { useAppFont } from "@/hooks/useAppFont";
import { navigationRef } from "@/navigation/navigationRef";
import { bottomDrawerStyles as styles } from "../styles/BottomDrawer.styles";

import { BottomDrawerProps } from "@/types/BottomDrawer.types";
import Arrow from "../../../assets/svg/arrow.svg";
import { useBottomDrawerController } from "../controller/BottomDrawer.controller";
console.log("🔥 BottomDrawer.ui.ts LOADED");

export default function BottomDrawer({ currentRouteName }: BottomDrawerProps) {
  const { t } = useTranslation();
  const regularFont = useAppFont();
  const boldFont = useAppFont("bold");

  const { bottomSheetRef, snapPoints, handleSheetChange, loadedAssets } =
    useBottomDrawerController(currentRouteName);

  console.log(bottomSheetRef, snapPoints, handleSheetChange);
  const handleNavigateToLogin = () => {
    startTransition(() => {
      navigationRef.navigate("LoginScreen");
    });
  };

  const handleNavigateToSignup = () => {
    navigationRef.navigate("OnBoardingScreen");
  };

  return (
    <>
    <Portal>
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        onClose={() => handleSheetChange(-1)}
        onChange={handleSheetChange}
        style={styles.bottomSheet}
      >
        <BottomSheetView style={styles.content}>
          {/* Logo */}
          <Image
            source={{ uri: loadedAssets.logoD }}
            style={styles.logo}
            resizeMode="contain"
          />

          <View style={styles.actionContainer}>
            {/* Agree Checkbox */}
            <Checkbox value="agree" colorScheme="primary" size="lg">
              <Text style={{ fontFamily: regularFont }}>
                {t("common.agreeTerms")}
              </Text>
            </Checkbox>

            {/* Create Account Button */}
            <PressableMoti onPress={handleNavigateToSignup}>
              <View style={styles.primaryButton}>
                <View>
                  <Text style={styles.primaryButtonTitle}>
                    {t("common.newAccount")}
                  </Text>
                  <Text style={styles.primaryButtonSubtitle}>
                    {t("common.newAccount")}
                  </Text>
                </View>
                <Arrow width={16} height={16} />
              </View>
            </PressableMoti>

            {/* Existing Account Button */}
            <PressableMoti onPress={handleNavigateToLogin}>
              <View style={styles.secondaryButton}>
                <Text style={styles.secondaryButtonTitle}>
                  {t("common.existingAccount")}
                </Text>
              </View>
            </PressableMoti>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </Portal></>
  );
}
