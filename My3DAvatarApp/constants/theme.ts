import { generateColorScale } from "@/utils/generateColorScale";
import { extendTheme, ITheme, useColorModeValue } from "native-base";
import fontSizes from "./fontSizes";

export const PRIMARY_COLOR = "#27253A";
export const DEFAULT_TEXT_COLOR = "rgba(255, 255, 255, 1)";


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
