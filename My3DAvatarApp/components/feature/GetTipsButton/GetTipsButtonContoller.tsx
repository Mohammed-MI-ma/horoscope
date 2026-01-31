// components/GetTipsButton/GetTipsButton.tsx
import React from "react";
import { useColorModeValue } from "native-base";
import GetTipsButtonUI from "./GetTipsButtonUI";

export const GetTipsButton = ({ onPress }: { onPress: () => void }) => {
  const textColor = useColorModeValue("white", "black");
  const iconColor = textColor;

  return <GetTipsButtonUI onPress={onPress} textColor={textColor} iconColor={iconColor} />;
};

export default GetTipsButton;
