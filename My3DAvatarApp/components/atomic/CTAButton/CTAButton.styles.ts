// src/screens/welcomeScreen.styles.ts
import { fontSizes, spacing } from "@/constants/theme";
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";

// Define a type for your styles
interface Styles {
  CTAContainer: ViewStyle;
}

export const styles: Styles = StyleSheet.create<Styles>({
  CTAContainer: {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    bottom: 50,
    left: 0,
    zIndex: 9999,
    width: "100%",
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 100,
    // Android elevation
    elevation: 20,
    position: "absolute",
  },
});
