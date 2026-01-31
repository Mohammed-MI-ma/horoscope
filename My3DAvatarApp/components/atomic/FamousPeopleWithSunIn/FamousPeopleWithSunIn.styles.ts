import { fontSizes, primaryShades } from "@/constants/theme";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: primaryShades[100],
    borderRadius: 3,
    padding: 5,
    position: "relative",
    gap: 10,
  },
  left: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "black",
    borderRadius: 3,
    height: 100,
  },
  right: {
    flex: 3,
    elevation: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontSize: fontSizes["sm"],
    color: "white",
  },
  column: {
    flex: 1, // ← makes all 5 columns equal
    borderRightWidth:.5,
    borderColor: "white",
  },
});
