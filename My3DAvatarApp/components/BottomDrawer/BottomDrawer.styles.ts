// BottomDrawer.styles.ts
import { fontSizes, primaryShades } from "@/constants/theme";
import { Dimensions, StyleSheet } from "react-native";
const WINDOW_WIDTH = Dimensions.get("window").width;

export const bottomDrawerStyles = StyleSheet.create({
  bottomSheet: {
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 50,
    shadowOffset: { width: 0, height: -2 },elevation:6
  },

  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 48,
    borderWidth: 1,
    borderColor: "#ffffffff",
  },
  actionContainer: {
    width: "100%",
    alignItems: "center",
    gap: 16,
  },

  // Buttons
  primaryButton: {
    width: WINDOW_WIDTH - 50,
    borderRadius: 5,
    backgroundColor: primaryShades[500],
    paddingHorizontal: 30,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  primaryButtonTitle: {
    color: "white",
    fontSize: fontSizes["2xl"],
  },
  primaryButtonSubtitle: {
    color: "white",
    fontSize: fontSizes["xs"],
  },

  secondaryButton: {
    width: WINDOW_WIDTH - 50,
    height: 100,
    borderRadius: 25,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },

  secondaryButtonTitle: {
    color: "black",
    fontSize: 25,
    fontFamily: "Bold",
  },
});
