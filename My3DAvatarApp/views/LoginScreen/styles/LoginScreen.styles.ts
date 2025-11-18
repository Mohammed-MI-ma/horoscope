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
  socialContainer:ViewStyle;
}

export const styles: Styles = StyleSheet.create<Styles>({
  header: {
    flex: 1,
    position: "relative",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  title: {
    fontSize: 28,
  },
  subtitle: {
    marginBottom: 40,
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
    height: 48,
    backgroundColor: "#007BFF",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 12,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  socialButton: {
    flex: 1,
    height: 48,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 4,
  },
  socialText: { color: "#fff", fontWeight: "600" },
  recaptchaButton: {
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 8,
  },
  recaptchaText: { color: "#333", fontWeight: "500" },
  error: { color: "red", fontSize: 12, marginBottom: 4 },
});
