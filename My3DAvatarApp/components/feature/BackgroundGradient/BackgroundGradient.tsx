import React from "react";
import { useBackgroundGradient } from "./BackgroundGradient.controller";
import { BackgroundGradientUI } from "./BackgroundGradient.ui";

export default function BackgroundGradient({ children }: { children?: React.ReactNode }) {
  const { windowWidth, windowHeight, gradients, loadedAssets } = useBackgroundGradient();

  return (
    <BackgroundGradientUI
      windowWidth={windowWidth}
      windowHeight={windowHeight}
      gradients={gradients}
      loadedAssets={loadedAssets}
    >
      {children}
    </BackgroundGradientUI>
  );
}
