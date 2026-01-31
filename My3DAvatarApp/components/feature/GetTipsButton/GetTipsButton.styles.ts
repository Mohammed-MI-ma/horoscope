// components/GetTipsButton/styles.ts
import { StyleSheet } from "react-native";
import fontSizes from "@/constants/fontSizes";

export const styles = StyleSheet.create({
  button: {
    borderRadius: 50,
    height: 40,
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
    backgroundColor: "transparent", // animated background handles color
  },

  innerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  icon: {
    marginTop: 0, // space between icon & text
  },

  text: {
    fontSize: fontSizes.xs,
  },
});
