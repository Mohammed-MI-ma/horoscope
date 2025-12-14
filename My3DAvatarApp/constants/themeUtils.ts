// themeUtils.ts

import { useColorModeValue } from "native-base"; // or Chakra UI
import { DEFAULT_TEXT_COLOR, PRIMARY_COLOR, primaryShades } from "./theme";

interface AnimatedColors {
  from: string;
  to: string;
}

/**
 * Returns an object with `from` and `to` colors based on language.
 * @param isArabic - whether the current language is Arabic
 * @param color1 - first color
 * @param color2 - second color
 * @returns object containing `from` and `to` colors
 */
export function getAnimatedColors(
  isArabic: boolean,
  color1: string,
  color2: string
): AnimatedColors {
  return {
    from: isArabic ? color1 : color2,
    to: isArabic ? color2 : color1,
  };
}
// themeColors.ts

export const useThemeColors = () => {
  const bg = useColorModeValue(primaryShades[100],primaryShades[700] );
  const textColor = useColorModeValue(DEFAULT_TEXT_COLOR, PRIMARY_COLOR);

  return { bg, textColor };
};
