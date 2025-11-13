import { useGlobalBgInverted } from "@/constants/theme";
import { useColorMode } from "native-base";
import React, { useEffect } from "react";
import { StatusBar, StatusBarStyle } from "react-native";

/**
 * A global, theme-aware StatusBar component.
 * Works with both Expo and pure React Native.
 */
interface GlobalStatusBarProps {
  translucent?: boolean;
  backgroundColor?: string;
}

const GlobalStatusBar: React.FC<GlobalStatusBarProps> = ({
  translucent = false,
  backgroundColor,
}) => {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === "dark";
  const bg = useGlobalBgInverted();

  const finalBg = backgroundColor || bg;
  const barStyle: StatusBarStyle = isDarkMode
    ? "light-content"
    : "dark-content";

  // ✅ Force reapply style on every theme change
  useEffect(() => {
    StatusBar.setBarStyle(barStyle, true);
  }, [barStyle]);

  return (
    <StatusBar
      barStyle={"light-content"}
      backgroundColor={finalBg}
    />
  );
};

export default React.memo(GlobalStatusBar);
