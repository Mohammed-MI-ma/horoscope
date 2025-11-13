import theme from "@/constants/theme"; // ✅ Import your centralized theme and fontSizes
import { StyleSheet, ViewStyle } from "react-native";

// Define a type for your styles object
interface Styles {
  layer: ViewStyle;
  container: ViewStyle;

}

export const styles: Styles = StyleSheet.create<Styles>({
  // ========================
  // Base Layer Helpers
  // ========================
  layer: {
    ...StyleSheet.absoluteFillObject, // Fill parent container
  },

  container: {
    flex: 1,
    position: "relative",
    backgroundColor: theme.colors.text[100], // fallback background
  },
});
