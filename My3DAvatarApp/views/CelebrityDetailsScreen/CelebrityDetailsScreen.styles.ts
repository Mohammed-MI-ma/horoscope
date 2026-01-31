import { fontSizes, primaryShades } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 12,
  },

  headerOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    width: "100%",
    paddingTop: 20,
    flexDirection: "row",paddingHorizontal:10,
  },

  headerText: {
    color: primaryShades[700],
    backgroundColor: "white",
    fontSize: fontSizes["3xl"],
    textAlign: "center",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});
