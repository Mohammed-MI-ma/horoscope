// src/providers/FontProvider.tsx
import * as Font from "expo-font";
import React, { createContext, useEffect, useState } from "react";
import { Text } from "react-native";
import { useDispatch } from "react-redux";
import { setFontsLoaded } from "../redux/applicationSlice";

export const FontContext = createContext({ fontsLoaded: false });

export const FontProvider = ({ children }: { children: React.ReactNode }) => {
  const [fontsLoaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadFonts = async () => {
      try {
        await Font.loadAsync({
          "Cairo-Regular": require("../assets/fonts/Cairo-Regular.ttf"),
          "Inter-Regular": require("../assets/fonts/Oswald-Regular.ttf"),
          "alfont_com_DARK": require("../assets/fonts/alfont_com_DARK.ttf"),
        });
        setLoaded(true);
        dispatch(setFontsLoaded(true));
      } catch (err) {
        console.error("Error loading fonts:", err);
      }
    };
    loadFonts();
  }, [dispatch]);

  if (!fontsLoaded) return <Text>Loading fonts...</Text>;

  return (
    <FontContext.Provider value={{ fontsLoaded }}>
      {children}
    </FontContext.Provider>
  );
};
