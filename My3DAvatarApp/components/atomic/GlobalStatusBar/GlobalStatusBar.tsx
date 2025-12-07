import { useThemeColors } from "@/constants/themeUtils";
import { useColorMode } from "native-base";
import React, { useEffect, useMemo } from "react";
import { StatusBar, StatusBarStyle } from "react-native";

interface GlobalStatusBarProps {
  translucent?: boolean;
  backgroundColor?: string;
}

const GlobalStatusBar: React.FC<GlobalStatusBarProps> = ({
  translucent = false,
  backgroundColor,
}) => {
  const { colorMode } = useColorMode();
  const { bg, textColor } = useThemeColors();

  // Determine background color
  const finalBg = backgroundColor ?? (colorMode === "dark" ? "#000" : "#fff");

  // Determine bar style based on background
  const barStyle: StatusBarStyle = useMemo(() => {
    if (backgroundColor === "black" || colorMode === "dark") {
      return "light-content";
    }
    return "dark-content";
  }, [backgroundColor, colorMode]);

  // Reapply on theme or barStyle change
  useEffect(() => {
    StatusBar.setBarStyle(barStyle, true);
  }, [barStyle]);

  return (
  <StatusBar
          animated={true}
          backgroundColor="#000000ff"
          barStyle={"light-content"}
          showHideTransition={"slide"}
          hidden={false}
        />
  );
};

export default React.memo(GlobalStatusBar);
