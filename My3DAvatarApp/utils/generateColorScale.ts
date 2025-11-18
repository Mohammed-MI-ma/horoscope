import chroma from "chroma-js";

export const PRIMARY_COLOR = "#37353E";
export const DEFAULT_TEXT_COLOR = "#FFFFFF";


export const generateColorScale = (baseColor: string) => {
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