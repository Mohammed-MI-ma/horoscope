import { StyleSheet } from "react-native";
import { primaryShades } from "@/constants/theme";

export const styles = StyleSheet.create({
  containerRow: {
    alignItems: "center",
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  avatarWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 50,
    padding: 20,
    marginRight: 10,
  },
  avatar: { width: 50, height: 50 },
  userInfoWrapper: { marginHorizontal: 5 },
  card: {
    alignItems: "center",
    marginBottom: 10,
    width: "100%",
    backgroundColor: primaryShades[100],
    height: 100,
    borderRadius: 10,
    elevation: 20,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  lottieWrapper: {
    alignItems: "flex-end",
    justifyContent: "center",
  },
  lottie: { width: 100, height: 100 },
  textWrapper: { flex: 1, paddingHorizontal: 10, justifyContent: "center" },
  titleText: { fontSize: 21 },
  descriptionText: { fontSize: 12 },
});
