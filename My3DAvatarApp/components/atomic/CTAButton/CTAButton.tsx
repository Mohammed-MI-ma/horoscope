import { useFocusEffect } from "@react-navigation/native";
import { MotiView } from "moti";
import { useState, useCallback } from "react";
import { View } from "react-native";
import MCIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { styles } from "./CTAButton.styles";
import { Button } from "native-base";
export default function CTAButton({ handlePress }) {
  const [animationKey, setAnimationKey] = useState(0);

  useFocusEffect(
    useCallback(() => {
      // restart the animation when screen is focused
      setAnimationKey((prev) => prev + 1);
    }, [])
  );

  return (
    <View style={styles.CTAContainer}>
      {/* Pulsing ring beneath button */}
      <MotiView
        key={animationKey} // force remount to restart animation
        from={{ scale: 0.5, opacity: 1 }}
        animate={{ scale: 1.5, opacity: 0 }}
        transition={{ loop: true, type: "timing", duration: 1000 }}
        style={{
          width: 70,
          height: 70,
          borderRadius: 100,
          borderWidth: 2,
          borderColor: "#ffffffff",
          zIndex: 0, // behind button
          position:"absolute"
        }}
      />
      {/* Actual button */}
      <Button
        onPress={handlePress}
        bg="white"
        style={{
          zIndex: 1,
          width: 50,
          height: 50,
          borderRadius: 100,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <MCIcon name="arrow-right" size={25} color="black" />
      </Button>
    </View>
  );
}
