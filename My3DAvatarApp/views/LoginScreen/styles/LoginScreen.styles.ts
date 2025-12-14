import { fontSizes } from "@/constants/theme";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";

// Define a type for your styles object
interface Styles {
  header: ViewStyle;
  container: ViewStyle;
  title: TextStyle;
  subtitle: TextStyle;
  input: TextStyle;
  socialButton: ViewStyle;
  socialText: TextStyle;
  socialContainer: ViewStyle;
  button: ViewStyle;
  buttonText: TextStyle;
  recaptchaText: TextStyle;
  error: TextStyle;
}

export const styles: Styles = StyleSheet.create<Styles>({
  header: {
    flex: 1,
    position: "relative",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "white",
  },
  title: {
    fontSize: fontSizes["lg"],
  },
  subtitle: {
    marginBottom: 10,
    fontSize: fontSizes["sm"],
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  button: {
    height: 36,
    backgroundColor: "#000000ff",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: fontSizes["md"], fontWeight: "600" },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  socialButton: {
    flex: 1,
    height: 36,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  socialText: { color: "#fff", fontWeight: "600" },

  recaptchaText: { color: "#333", fontWeight: "500" },
  error: { color: "red", fontSize: 12, marginBottom: 4 },
});
