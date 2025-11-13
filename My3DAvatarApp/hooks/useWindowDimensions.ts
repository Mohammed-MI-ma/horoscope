// src/hooks/useWindowDimensions.ts
import { useEffect, useState } from "react";
import { Dimensions } from "react-native";

export function useWindowDimensions() {
  const [window, setWindow] = useState(Dimensions.get("window"));

  useEffect(() => {
    const handler = ({ window }: { window: any }) => setWindow(window);
    const sub = Dimensions.addEventListener("change", handler);
    return () => sub?.remove?.();
  }, []);

  return window;
}
