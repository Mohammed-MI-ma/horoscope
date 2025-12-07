// src/screens/welcomeScreen.styles.ts
import { fontSizes, spacing } from "@/constants/theme";
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";

// Define a type for your styles
interface Styles {
  container: ViewStyle;
  planetsWrapper: ViewStyle;
  contentWrapper: ViewStyle;
  logo: ImageStyle;
  title: TextStyle;
  subtitle: TextStyle;
  button: ViewStyle;
  CTAContainer: ViewStyle;
}

export const styles: Styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    position: "relative",
  },
  planetsWrapper: {
    ...StyleSheet.absoluteFillObject,
  },
  contentWrapper: {
    padding: 20,
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    position: "relative",
  },
  logo: {
    width: 75,
    height: 32,
    resizeMode: "contain",
  },
  title: {
    fontSize: fontSizes["4xl"],
    textAlign: "center",
    marginBottom: spacing.lg,
  },
  subtitle: {
    fontSize: fontSizes.xs,
    textAlign: "center",
  },
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
