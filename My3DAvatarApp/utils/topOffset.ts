import { Platform, StatusBar } from "react-native";

export const topOffset = (extra: number) =>
  Platform.OS === "android" ? (StatusBar.currentHeight ?? 0) + extra : 20 + extra;
