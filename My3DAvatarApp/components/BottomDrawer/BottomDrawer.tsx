// BottomDrawer.tsx
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Checkbox } from "native-base";
import React, { startTransition, useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import { Portal } from "react-native-portalize";
import Toast from "react-native-toast-message";

import PressableMoti from "@/components/atomic/PressableMoti/PressableMoti";
import { AssetsProvider, useAssets } from "@/contexts/AssetsContext";
import { useAppFont } from "@/hooks/useAppFont";
import { bottomDrawer_Assets } from "@/images";
import { navigationRef } from "@/navigation/navigationRef";
import { BottomDrawerProps } from "@/types/BottomDrawer.types";
import Arrow from "@/assets/svg/arrow.svg";

//__Controller
import { useBottomDrawerController } from "./BottomDrawer.controller";

//__Styling
import { bottomDrawerStyles as styles } from "./BottomDrawer.styles";
import fontSizes from "@/constants/fontSizes";
import DividerWithText from "../atomic/DividerWithText/DividerWithText";

function BottomDrawerContent({
  currentRouteName,
  isLoggedIn,
}: BottomDrawerProps & { isLoggedIn: boolean }) {
  const { t } = useTranslation();
  const regularFont = useAppFont();
  const boldFont = useAppFont("bold");
  const [consentGiven, setConsentGiven] = useState(false);

  const { bottomSheetRef, snapPoints, handleSheetChange } =
    useBottomDrawerController(currentRouteName, isLoggedIn);

  const { loadedAssets } = useAssets();
  if (!loadedAssets) return null;

  const handleNavigateToLogin = () => {
    startTransition(() => {
      navigationRef.navigate("LoginScreen");
    });
  };

  const handleNavigateToSignup = () => {
    navigationRef.navigate("LoginScreen");
  };
  return (
    <Portal>
      <BottomSheet
        ref={bottomSheetRef}
        index={-1} // initially closed
        snapPoints={snapPoints}
        enablePanDownToClose
        onClose={() => handleSheetChange(-1)}
        onChange={handleSheetChange}
        style={styles.bottomSheet}
      >
        <BottomSheetView style={styles.content}>
          <View style={styles.actionContainer}>
            {/* Agree Checkbox */}
            <Checkbox
              value="agree"
              colorScheme="primary"
              size="md"
              isChecked={consentGiven}
              onChange={(value) => setConsentGiven(value)}
            >
              <Text
                style={{ fontFamily: regularFont, fontSize: fontSizes["sm"] }}
              >
                {t("common.agreeTerms")}
              </Text>
            </Checkbox>
            {/* Create Account Button */}
            <PressableMoti
              onPress={() => {
                if (!consentGiven) {
                  // show toast if consent not given
                  Toast.show({
                    type: "info",
                    text1: t("common.actionBlocked"),
                    text2: t("common.mustAcceptTerms"),
                    position: "top",
                  });
                  return; // prevent navigation
                }
                handleNavigateToSignup();
              }}
            >
              <View
                style={[
                  !consentGiven && { opacity: 0.35 }, // visually indicate disabled
                  styles.primaryButton,
                ]}
              >
                <View>
                  <Text
                    style={[
                      styles.primaryButtonTitle,
                      { fontFamily: boldFont },
                    ]}
                  >
                    {t("common.newAccount")}
                  </Text>

                  <Text
                    style={[
                      styles.primaryButtonSubtitle,
                      { fontFamily: regularFont },
                    ]}
                  >
                    {t("common.newAccount")}
                  </Text>
                </View>
                <Arrow width={16} height={16} />
              </View>
            </PressableMoti>

            <DividerWithText text={t("common.or")} />

            {/* Existing Account Button */}
            <PressableMoti onPress={handleNavigateToLogin}>
              <View style={styles.secondaryButton}>
                <Text
                  style={[
                    styles.secondaryButtonTitle,
                    { fontFamily: regularFont },
                  ]}
                >
                  {t("common.existingAccount")}
                </Text>
              </View>
            </PressableMoti>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </Portal>
  );
}

// Wrap the BottomDrawer content in AssetsProvider
export default function BottomDrawer({
  currentRouteName,
  isLoggedIn,
}: BottomDrawerProps & { isLoggedIn: boolean }) {
  return (
    <AssetsProvider
      assetsToLoad={bottomDrawer_Assets}
      fallback={<Text>Loading assets...</Text>}
    >
      <BottomDrawerContent
        currentRouteName={currentRouteName}
        isLoggedIn={isLoggedIn}
      />
    </AssetsProvider>
  );
}
