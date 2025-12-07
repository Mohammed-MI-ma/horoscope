// components/GetTipsButton/GetTipsButton.tsx
import { useColorModeValue } from "native-base";
import React from "react";
import GetTipsButtonUI from "../ui/GetTipsButtonUI";

export const GetTipsButton = ({ onPress }: { onPress: () => void }) => {
  const bg = useColorModeValue("primary.700", "white");
  const textColor = useColorModeValue("white", "black");
  const iconColor = textColor;

  return (
    <GetTipsButtonUI
      onPress={onPress}
      bgColor={bg}
      textColor={textColor}
      iconColor={iconColor}
    />
  );
};

export default GetTipsButton;
