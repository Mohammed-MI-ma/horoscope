// components/GetTipsButton/GetTipsButtonUI.tsx
import Tips from "@/assets/svg/tips.svg";
import { useAppFont } from "@/hooks/useAppFont";
import { RootStateType } from "@/store";
import type { TFunction } from "i18next";
import { Button } from "native-base";
import React from "react";
import { useTranslation } from "react-i18next";
import { Text } from "react-native";
import Animated, { FadeInDown, FadeOutUp } from "react-native-reanimated";
import { useSelector } from "react-redux";
import { styles } from "../styles/GetTipsButton.styles";

interface Props {
  onPress: () => void;
  bgColor: string;
  textColor: string;
  iconColor: string;
}

const GetTipsButtonUI = ({ onPress, bgColor, textColor, iconColor }: Props) => {
  const { t }: { t: TFunction } = useTranslation();
  const boldFont = useAppFont("bold");
 const isDarkMode = useSelector(
    (state: RootStateType) => state.application.isDarkMode
  );
  return (
    <Button
      onPress={onPress}
      bg={bgColor}
      style={styles.button}
      _text={{ color: textColor }}
    >
      <Animated.View
        style={styles.innerContainer}
        key={isDarkMode ? "dark" : "light"}
        entering={FadeInDown.springify().duration(100)}
        exiting={FadeOutUp.springify().duration(100)}
      >
        <Tips width={25} height={25} fill={iconColor} style={styles.icon} />
        <Text style={[styles.text, { color: textColor, fontFamily: boldFont }]}>
          {t("GetTips")}
        </Text>
      </Animated.View>
    </Button>
  );
};

export default GetTipsButtonUI;
