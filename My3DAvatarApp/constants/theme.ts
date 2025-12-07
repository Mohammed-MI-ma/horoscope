import { generateColorScale } from "@/utils/generateColorScale";
import { extendTheme, ITheme, useColorModeValue } from "native-base";
import fontSizes from "./fontSizes";

export const PRIMARY_COLOR = "#27253A";
export const DEFAULT_TEXT_COLOR = "#FFFFFF"; // simpler

// Generate shades for primary
const primaryShades = generateColorScale(PRIMARY_COLOR);

// ------------------------------
// Spacing System
// ------------------------------
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  "2xl": 32,
  "3xl": 40,
  "4xl": 48,
} as const;



// ------------------------------
// Theme Definition
// ------------------------------
const customTheme: ITheme = extendTheme({
  colors: {
    primary: primaryShades,
    text: {
      primary: PRIMARY_COLOR,
      secondary: DEFAULT_TEXT_COLOR,
    },
  },
  fontSizes,
  semanticTokens: {
    colors: {
      text: {
        default: DEFAULT_TEXT_COLOR, // dark mode default
        _light: PRIMARY_COLOR, // light mode default
        _dark: DEFAULT_TEXT_COLOR, // dark mode default
      },
      background: {
        default: primaryShades[900],
        _light: "#FFFFFF",
        _dark: primaryShades[900],
      },
      invertedText: {
        default: PRIMARY_COLOR,
        _light: PRIMARY_COLOR,
        _dark: "#FFFFFF",
      },
    },
  },
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
});

// ------------------------------
// Custom Hooks
// ------------------------------
export const useGlobalBg = () => {
  return useColorModeValue(primaryShades[50], primaryShades[500]);
};

export const useGlobalBgInverted = () => {
  return useColorModeValue(primaryShades[500], primaryShades[50]);
};

// ------------------------------
export default customTheme;
export { fontSizes, primaryShades };
