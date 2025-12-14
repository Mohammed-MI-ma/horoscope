// BottomDrawer.styles.ts
import { Dimensions, StyleSheet } from "react-native";
const WINDOW_WIDTH = Dimensions.get("window").width;

export const bottomDrawerStyles = StyleSheet.create({
  bottomSheet: {
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 50,
    shadowOffset: { width: 0, height: -2 },
  },

  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 48,
    borderWidth: 1,
    borderColor: "#ffffffff",
  },

  logo: {
    width: 100,
    height: 100,
    marginBottom: 30,
  },

  actionContainer: {
    width: "100%",
    alignItems: "center",
    gap: 16,
  },

  // Buttons
  primaryButton: {
    width: WINDOW_WIDTH - 50,
    height: 100,
    borderRadius: 25,
    backgroundColor: "#04172E",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  primaryButtonTitle: {
    color: "white",
    fontSize: 25,
    fontFamily: "Bold",
  },

  primaryButtonSubtitle: {
    color: "white",
    fontSize: 10,
    fontFamily: "Regular",
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
