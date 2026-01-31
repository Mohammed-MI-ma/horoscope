import { StyleSheet } from "react-native";
import fontSizes from "@/constants/fontSizes";

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },

  button: {
    borderRadius: 50,
    padding: 10,
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    elevation: 10,
  },

  topHeader: {
    position: "absolute",
    top: 0,
    left: 10,
    right: 10,
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    justifyContent: "space-between",
  },

  elementsContainer: { position: "absolute", bottom: 10, width: "100%" },

  logoContainer: { justifyContent: "center", alignItems: "center" },

  titleText: { fontSize: fontSizes["xs"], color: "white" },
});
