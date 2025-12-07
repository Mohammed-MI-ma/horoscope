import * as Font from "expo-font";
import React, { createContext, ReactNode, useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { useDispatch } from "react-redux";
import { setFontsLoaded } from "../redux/applicationSlice";

export const FontContext = createContext({ fontsLoaded: false });

interface FontProviderProps {
  children: ReactNode;
}

export const FontProvider = ({ children }: FontProviderProps) => {
  const [fontsLoaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadFonts = async () => {
      try {
        await Font.loadAsync({
          "Cairo-Regular": require("../assets/fonts/Cairo-Regular.ttf"),
          "Inter-Regular": require("../assets/fonts/Inter-Regular.ttf"),
          "alfont_com_DARK": require("../assets/fonts/alfont_com_DARK.ttf"),
        });
        setLoaded(true);
        dispatch(setFontsLoaded(true));
      } catch (err) {
        console.error("Error loading fonts:", err);
        setLoaded(true); // fallback to system fonts
      }
    };
    loadFonts();
  }, [dispatch]);

  if (!fontsLoaded) {
    // Better loading UI for production
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <FontContext.Provider value={{ fontsLoaded }}>
      {children}
    </FontContext.Provider>
  );
};
