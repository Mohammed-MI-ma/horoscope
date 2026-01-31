import { useAssets } from "@/contexts/AssetsContext";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";
import { RootStateType } from "@/store";
import { useSelector } from "react-redux";
import { useMemo } from "react";

export const useBackgroundGradient = () => {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const isDarkMode = useSelector((state: RootStateType) => state.application.isDarkMode);
  const { loadedAssets } = useAssets();

  // Memoize gradients so they are only recomputed when isDarkMode changes
  const gradients = useMemo(() => {
    return [
      {
        isActive: isDarkMode,
        colors: ["#ffffffff", "#ffffffff"], // light mode
      },
      {
        isActive: !isDarkMode,
        colors: ["#000008", "#181a33ff", "#000008"], // dark mode
      },
    ];
  }, [isDarkMode]);

  return { windowWidth, windowHeight, isDarkMode, gradients, loadedAssets };
};
