// components/GetTipsButton/GetTipsButtonUI.tsx
import Tips from "@/assets/svg/tips.svg";
import { useAppFont } from "@/hooks/useAppFont";
import { RootStateType } from "@/store";
import type { TFunction } from "i18next";
import React, { memo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, Text } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { shallowEqual, useSelector } from "react-redux";
import { styles } from "./GetTipsButton.styles";
import { primaryShades } from "@/constants/theme";

interface Props {
  onPress: () => void;
  textColor: string;
  iconColor: string;
}
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const GetTipsButtonUI = ({ onPress, textColor, iconColor }: Props) => {
  const { t }: { t: TFunction } = useTranslation();
  const boldFont = useAppFont("bold");
  // Get dark mode state from Redux
  // Narrow selector + shallowEqual
  const isDarkMode = useSelector(
    (state: RootStateType) => state.application.isDarkMode,
    shallowEqual
  );
  // Shared value for animation: 0 = light, 1 = dark
  const progress = useSharedValue(isDarkMode ? 1 : 0);

  // Animate on dark mode change
  useEffect(() => {
    progress.value = withTiming(isDarkMode ? 1 : 0, { duration: 400 });
  }, [isDarkMode, progress]);
  // Animated style
  const animatedBgStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      [primaryShades[500], primaryShades[50]] // light → dark
    ),
  }));
  const color = !isDarkMode ? "#ffffff" : "#000000";

  return (
    <AnimatedPressable
      onPress={onPress}
      style={[styles.button, animatedBgStyle]}
      hitSlop={10}
      accessibilityRole="button"
      accessibilityLabel="Get Tips"
    >
      <Animated.View
        style={styles.innerContainer}
        accessible={false} // prevent double screen-reader focus
      >
        <Tips
          width={25}
          height={25}
          color={color}
          style={styles.icon}
          accessibilityElementsHidden
          importantForAccessibility="no"
        />
        <Text style={[styles.text, { color: color, fontFamily: boldFont }]}>
          {t("GetTips")}
        </Text>
      </Animated.View>
    </AnimatedPressable>
  );
};

export default memo(GetTipsButtonUI);
