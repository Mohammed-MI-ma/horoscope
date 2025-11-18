// components/GetTipsButton/styles.ts
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  button: {
    borderRadius: 50,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 4, height: 4 },
    elevation: 6,
  },

  innerContainer: {
    flexDirection: "row",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  icon: {
    marginTop: 8,
  },

  text: {
    fontSize: 12,
  },
});
