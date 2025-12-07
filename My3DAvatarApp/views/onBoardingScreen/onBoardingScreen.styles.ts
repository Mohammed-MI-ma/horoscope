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

  },
  card: {
    width: "48%", // fits 2 per row
    height: 120,
    backgroundColor: "#f2f2f2",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },

  cardText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
