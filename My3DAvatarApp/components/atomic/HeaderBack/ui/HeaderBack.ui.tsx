import { useRTL } from "@/contexts/RTLContext";
import { Button } from "native-base";
import React from "react";
import { View } from "react-native";
// @ts-ignore: allow importing SVG files without type declarations
import Arrow from "../../../../assets/svg/arrow.svg"; // adjust path
import { useHeaderBackController } from "../controller/HeaderBack.controller";
import { styles } from "../styles/HeaderBack.styles";

interface HeaderBackProps {
  onBack?: () => void;
}

const HeaderBack: React.FC<HeaderBackProps> = ({ onBack }) => {
  const { handleBack } = useHeaderBackController(onBack);
  const { isRtl: isRTL } = useRTL();

  return (
    <View
      accessibilityRole="header"
      style={[{ flexDirection: isRTL ? "row-reverse" : "row" }]}
    >
      <Button onPress={handleBack} style={styles.backButton}>
        <Arrow width={10} height={10} />
      </Button>
    </View>
  );
};

export default HeaderBack;
