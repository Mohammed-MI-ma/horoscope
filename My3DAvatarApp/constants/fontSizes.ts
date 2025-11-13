// src/constants/fontSizes.ts
const fontSizes = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  "2xl": 20,
  "3xl": 24,
  "4xl": 28,
  "5xl": 32,
} as const;

export type FontSizeKey = keyof typeof fontSizes;
export default fontSizes;
