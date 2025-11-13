import { NavigationContainer } from "@react-navigation/native";
import { useColorMode } from "native-base";
import React, { useEffect, useState, useTransition } from "react";
import { Text } from "react-native";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { useSelector } from "react-redux";
import { useGlobalLoader } from "./contexts/GlobalLoaderContext";
import { RootStateType } from "./store";

// ✅ Regular imports for screens (no lazy)
import { useWindowDimensions } from "./hooks/useWindowDimensions";
import WelcomeScreen from "./views/welcomeScreen/welcomeScreen";

const Stack = createSharedElementStackNavigator();

const AppInner = () => {
  const { hideLoader } = useGlobalLoader();
  const [ready, setReady] = useState(false);
  const [isPending, startTransition] = useTransition();

  const isDarkMode = useSelector(
    (state: RootStateType) => state.application.isDarkMode
  );
  const { colorMode, toggleColorMode } = useColorMode();

  // Sync Redux → NativeBase
  useEffect(() => {
    if (
      (isDarkMode && colorMode !== "dark") ||
      (!isDarkMode && colorMode !== "light")
    ) {
      toggleColorMode();
    }
  }, [isDarkMode]);

  // Initial setup
  useEffect(() => {
    startTransition(() => {
      setReady(true);
      hideLoader();
    });
  }, []);

  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
c
  if (!ready) return         <Text>Switching screens...</Text>
;

  return (
    <NavigationContainer>
      {isPending ? (
        <Text>Switching screens...</Text>
      ) : (
        <Stack.Navigator
          initialRouteName="MainApp"
          screenOptions={{
            headerShown: false,
            detachPreviousScreen: false,

            animation: "slide_from_right",
            gestureEnabled: true,
          }}
        >
          <Stack.Screen name="MainApp" component={WelcomeScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default AppInner;
