// src/theme/GlobalText.tsx
import React from "react";
import { Text, TextProps } from "react-native";
import { useAppFont } from "../hooks/useAppFont";

const GlobalText = (props: TextProps) => {
  const fontFamily = useAppFont();
  return (
    <Text
      {...props}
      style={[{ fontFamily, writingDirection: "auto" }, props.style]}
    />
  );
};

export default GlobalText;
