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
      translucent={translucent}
      backgroundColor={finalBg}
      barStyle={barStyle}
    />
  );
};

export default React.memo(GlobalStatusBar);
