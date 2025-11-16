import { MotiView } from "moti";
import React, { ReactNode, useState } from "react";
import { Pressable, StyleProp, StyleSheet, ViewStyle } from "react-native";

interface PressableMotiProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  scale?: number; // optional scale factor
}

const PressableMoti: React.FC<PressableMotiProps> = ({
  children,
  style = {},
  onPress = () => {},
  scale = 0.95,
}) => {
  const [pressed, setPressed] = useState(false);

  return (
    <Pressable
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      onPress={onPress}
    >
      <MotiView
        style={[styles.container, style]}
        animate={{
          scale: pressed ? scale : 1,
          opacity: pressed ? 0.9 : 1,
        }}
        transition={{
          type: "timing",
          duration: 100,
        }}
      >
        {children}
      </MotiView>
    </Pressable>
  );
};

export default PressableMoti;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});
