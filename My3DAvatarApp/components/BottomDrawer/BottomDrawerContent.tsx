import React, { useState, useCallback, useTransition } from "react";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Checkbox, Text, View } from "native-base";
import { Portal } from "react-native-portalize";
import Toast from "react-native-toast-message";
import { useTranslation } from "react-i18next";
import { useAppFont } from "@/hooks/useAppFont";
import { navigationRef } from "@/navigation/navigationRef";
import DividerWithText from "../atomic/DividerWithText/DividerWithText";
import { useBottomDrawerController } from "./BottomDrawer.controller";
import { bottomDrawerStyles as styles } from "./BottomDrawer.styles";
import fontSizes from "@/constants/fontSizes";
import { BottomDrawerProps } from "@/types/BottomDrawer.types";
import ConsentNavigationButton from "../atomic/ConsentNavigationButton/ConsentNavigationButton";
import { primaryShades } from "@/constants/theme";
import PressableMoti from "../atomic/PressableMoti/PressableMoti";
import { showOverlay } from "@/redux/globalOverlaySlice";
import { useDispatch } from "react-redux";

export default function BottomDrawerContent({
  currentRouteName,
  isLoggedIn,
}: BottomDrawerProps & { isLoggedIn: boolean }) {
  const { t } = useTranslation();
  const regularFont = useAppFont();
  const boldFont = useAppFont("bold");
  const dispatch = useDispatch();
  const [consentGiven, setConsentGiven] = useState(false);
  const [isPending, startTransition] = useTransition();

  const { bottomSheetRef, snapPoints, handleSheetChange, loadedAssets } =
    useBottomDrawerController(currentRouteName, isLoggedIn);

  // Safe navigation with pending state
  const navigateWithPending = useCallback((screen: string) => {
    startTransition(() => {
      navigationRef.navigate(screen);
    });
  }, []);

  const handleNavigate = useCallback(() => {
    if (!consentGiven) {
      Toast.show({
        type: "info",
        text1: t("common.actionBlocked"),
        text2: t("common.mustAcceptTerms"),
        position: "top",
      });
      return;
    }
    navigateWithPending("LoginScreen");
  }, [consentGiven, t, navigateWithPending]);

  // Render nothing if assets are not loaded
  if (!loadedAssets) return null;

  return (
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
          <View style={styles.actionContainer}>
            <Checkbox
              value="agree"
              size="sm"
              isChecked={consentGiven}
              onChange={setConsentGiven}
              colorScheme="black"
              _checked={{
                bg: "white", // background of the box
                borderColor: primaryShades[900],
                _icon: {
                  color: primaryShades[900], // ✓ check color
                },
              }}
              _unchecked={{
                bg: "white",
                borderColor: "gray.400",
              }}
            >
              <Text
                style={{
                  fontFamily: regularFont,
                  fontSize: fontSizes.xs,
                  color: "black",
                }}
              >
                {t("common.agreeTerms")}
              </Text>
            </Checkbox>
            <ConsentNavigationButton
              title={t("common.newAccount")}
              onNavigate={handleNavigate}
              loading={isPending}
              consentGiven={consentGiven}
              titleFont={regularFont}
              containerStyle={styles.primaryButton}
              requiresConsent
            />
            <DividerWithText
              text={t("common.or")}
              textStyle={{ FontFamily: boldFont }}
            />
            <ConsentNavigationButton
              title={t("common.existingAccount")}
              onNavigate={handleNavigate}
              loading={isPending}
              titleFont={regularFont}
              containerStyle={styles.primaryButton}
            />
            <PressableMoti
              onPress={() => {
                dispatch(
                  showOverlay({
                    type: "pleaseLoginAnimation",
                    message: "You completed today’s challenge!",
                  }),
                );
              }}
            >
              <Text>dont show me this ver again</Text>
            </PressableMoti>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </Portal>
  );
}
