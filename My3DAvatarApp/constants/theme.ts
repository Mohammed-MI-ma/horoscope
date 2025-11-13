import chroma from "chroma-js";
import { extendTheme, ITheme, useColorModeValue } from "native-base";
import fontSizes from "./fontSizes";

export const PRIMARY_COLOR = "#37353E";
export const DEFAULT_TEXT_COLOR = "#FFFFFF";

// Utility to generate color scales (lighter to darker)
const generateColorScale = (baseColor: string) => {
  const scale = chroma
    .scale([
      chroma(baseColor).brighten(3).hex(),
      baseColor,
      chroma(baseColor).darken(3).hex(),
    ])
    .mode("lab")
    .colors(10)
    .map((c) => chroma(c).hex());

  return {
    50: scale[0],
    100: scale[1],
    200: scale[2],
    300: scale[3],
    400: scale[4],
    500: scale[5],
    600: scale[6],
    700: scale[7],
    800: scale[8],
    900: scale[9],
  } as const;
};

const primaryShades = generateColorScale(PRIMARY_COLOR);

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
      background: {
        default: primaryShades[900],
        _light: "red",
        _dark:"red",
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
export const useGlobalBg = () => {
  return useColorModeValue(primaryShades[500], primaryShades[50]);
};
export const useGlobalBgInverted = () => {
  return useColorModeValue(primaryShades[50], primaryShades[500]);
};
export default customTheme;
export { fontSizes, primaryShades };
