import React from "react";
import { Text } from "react-native";
import { AssetsProvider } from "@/contexts/AssetsContext";
import { bottomDrawer_Assets } from "@/images";
import BottomDrawerContent from "./BottomDrawerContent";
import { BottomDrawerProps } from "@/types/BottomDrawer.types";

export default function BottomDrawer({
  currentRouteName,
  isLoggedIn,
}: BottomDrawerProps & { isLoggedIn: boolean }) {
  if (isLoggedIn) return null;

  return (
    <AssetsProvider
      assetsToLoad={bottomDrawer_Assets}
      fallback={<Text>Loading drawer...</Text>}
    >
      <BottomDrawerContent
        currentRouteName={currentRouteName}
        isLoggedIn={isLoggedIn}
      />
    </AssetsProvider>
  );
}
