import { useAssets } from "@/contexts/AssetsContext";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";
import { RootStateType } from "@/store";
import { useSelector } from "react-redux";

export const useBackgroundGradient = () => {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const isDarkMode = useSelector((state: RootStateType) => state.application.isDarkMode);
  const { loadedAssets } = useAssets();

  const gradients = [
    {
      isActive: isDarkMode,
      colors: ["#ffffffff","#ffffffff"],
    },
    {
      isActive: !isDarkMode,
      colors: ["#000008", "#181a33ff", "#000008"],
    },
  ];

  return { windowWidth, windowHeight, isDarkMode, gradients, loadedAssets };
};
