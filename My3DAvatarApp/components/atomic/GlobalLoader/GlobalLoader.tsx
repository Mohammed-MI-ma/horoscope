// components/GlobalLoader.tsx
import GlobalText from "@/constants/GlobalText";
import { Center, Spinner, VStack } from "native-base";
import React from "react";
import { Dimensions, StyleSheet } from "react-native";

interface GlobalLoaderProps {
  visible?: boolean;
  message?: string;
}

const { width, height } = Dimensions.get("window");

const GlobalLoader: React.FC<GlobalLoaderProps> = ({
  visible = true,
  message = "Loading...",
}) => {
  if (!visible) return null;

  return (
    <Center style={styles.overlay}>
      <VStack space={4} alignItems="center">
        {/* NativeBase Spinner */}
        <Spinner size="lg" color="primary.500" />

        {/* Optional custom text using your GlobalText */}
        <GlobalText style={styles.text}>{message}</GlobalText>
      </VStack>
    </Center>
  );
};

export default GlobalLoader;

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width,
    height,
    backgroundColor: "#FFFFFF", // full white overlay
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  text: {
    color: "#000000",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "500",
  },
});
