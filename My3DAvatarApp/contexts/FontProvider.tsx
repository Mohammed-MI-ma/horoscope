// src/providers/FontProvider.tsx
import GlobalLoader from "@/components/atomic/GlobalLoader/GlobalLoader";
import { useFonts } from "expo-font";
import React, { createContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setFontsLoaded } from "../redux/applicationSlice";

export const FontContext = createContext({ fontsLoaded: false });

export const FontProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();

  // Load fonts with the hook
  const [fontsLoaded] = useFonts({
    "Cairo-Regular": require("../assets/fonts/Cairo-Regular.ttf"),
    "Inter-Regular": require("../assets/fonts/Inter-Regular.ttf"),
  });

  // Dispatch Redux action when fonts are loaded
  useEffect(() => {
    if (fontsLoaded) {
      dispatch(setFontsLoaded(true));
    }
  }, [fontsLoaded, dispatch]);

  // Show loader while fonts are loading
  if (!fontsLoaded) return <GlobalLoader message="Loading fonts..." />;

  return (
    <FontContext.Provider value={{ fontsLoaded }}>
      {children}
    </FontContext.Provider>
  );
};
