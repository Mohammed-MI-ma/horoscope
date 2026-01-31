import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  card: {
    width: 50,
    height: 50,
    borderRadius: 50,
    padding: 2,
    justifyContent: "center",

    // shadow (iOS)
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },

    // elevation (Android)
    elevation: 2,
  },
  title: {
    color: "#fff",
    fontSize: 8,
    textAlign: "center",
    maxWidth:50
  },
  zodiacLabel: {
    fontSize: 11,
    textAlign: "center",
  },
  image: {
  width: "100%",
  height: "100%",
  borderRadius: 50,
},
});
