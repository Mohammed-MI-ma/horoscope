import React from "react";
import { View, Text, StyleSheet } from "react-native";

type DividerWithTextProps = {
  text?: string;
  color?: string;
  thickness?: number;
  marginVertical?: number;
  textStyle?: object;
};

const DividerWithText: React.FC<DividerWithTextProps> = ({
  text = "",
  color = "#E0E0E0",
  thickness = 1,
  marginVertical = 7,
  textStyle = {},
}) => {
  return (
    <View style={[styles.container, { marginVertical }]}>
      <View style={[styles.line, { backgroundColor: color, height: thickness }]} />
      {text ? <Text style={[styles.text, textStyle]}>{text}</Text> : null}
      <View style={[styles.line, { backgroundColor: color, height: thickness }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  line: {
    flex: 1,
  },
  text: {
    marginHorizontal: 8,
    color: "#666",
    fontSize: 14,
  },
});

export default DividerWithText;
