import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
    elevation: 20,
  },
  
  tab: { flex: 1, justifyContent: "center", alignItems: "center" },
  label: { fontSize: 10, color: "black" },
  activeLabel: { color: "black", fontWeight: "bold" },
});
