import React, { useEffect, useRef, useState, useTransition } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import Toast from 'react-native-toast-message';

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useColorMode } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import Chat from "./assets/svg/chat.svg";
import Education from "./assets/svg/education.svg";
import Love from "./assets/svg/guidance_heart.svg";
import Solar from "./assets/svg/solar_planet-broken.svg";
import Tarrot from "./assets/svg/taroot.svg";

import { useGlobalLoader } from "./contexts/GlobalLoaderContext";
import { RootStateType } from "./store";
// Screens
import { AnimatePresence } from "moti";
import OnBoardingScreen from "./views/OnBoardingScreen/OnBoardingScreen";
import WelcomeScreen from "./views/welcomeScreen/welcomeScreen";

// Bottom Tab
import BottomDrawer from "./components/BottomDrawer/BottomDrawer";
import { NavigationBottomTab } from "./components/feature/NavigationBottomTab/NavigationBottomTab";
import { navigationRef } from "./navigation/navigationRef";
import { openDrawer } from "./redux/drawerSlice";
import WishlistScreen from "./views/WishlistScreen/WishlistScreen";
import { useAuth } from "./contexts/AuthContext";
import LoginScreen from "./views/LoginScreen/ui/LoginScreen";

const Stack = createNativeStackNavigator();

const AppInner = () => {
  const { hideLoader } = useGlobalLoader();
  const [ready, setReady] = useState(false);

  const [isPending, startTransition] = useTransition();

  const isDarkMode = useSelector(
    (state: RootStateType) => state.application.isDarkMode
  );
  const { colorMode, toggleColorMode } = useColorMode();
  const { user, initializing } = useAuth();
  const isLoggedIn = !!user;
  const currentRouteRef = useRef<string>("");
  const [currentRoute, setCurrentRoute] = useState<string>("");
  const dispatch = useDispatch();
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


  if (initializing) return <Text>Restoring session...</Text>;

  if (!ready) return <Text>Switching screens...</Text>;

  return (
    <>
      <NavigationContainer
        ref={navigationRef}
        onReady={() => {
          const name = navigationRef.getCurrentRoute()?.name || "";
          currentRouteRef.current = name; // fast access
          setCurrentRoute(name); // triggers re-render for UI
        }}
        onStateChange={() => {
          const name = navigationRef.getCurrentRoute()?.name || "";
          currentRouteRef.current = name;
          setCurrentRoute(name);
        }}
      >
        {isPending ? (
          <ActivityIndicator size="large" />
        ) : (
          <View style={styles.container}>
            {/* Stack takes all space above tab */}
            <View style={styles.stackContainer}>
              <AnimatePresence>
                <Stack.Navigator
                  initialRouteName="MainApp"
                  screenOptions={{
                    headerShown: false,
                    animation: "none",
                    gestureEnabled: false,
                  }}
                >
                  <Stack.Screen name="MainApp" component={WelcomeScreen} />
                  <Stack.Screen
                    name="OnBoardingScreen"
                    component={OnBoardingScreen}
                  />
                  <Stack.Screen
                    name="WishlistScreen"
                    component={WishlistScreen}
                  />
                     <Stack.Screen
                    name="LoginScreen"
                    component={LoginScreen}
                  />
                </Stack.Navigator>
              </AnimatePresence>
            </View>

            {/* Persistent Bottom Tab */}
            {currentRoute !== "MainApp" && (
              <NavigationBottomTab
                tabs={[
                  {
                    name: "Home",
                    Icon: Solar,
                    label: "اليوم",
                    onPress: () =>
                      /*handleTabPress("OnBoardingScreen")*/ console.log(
                        "Go Home"
                      ),
                  },
                  {
                    name: "Profile",
                    label: "التوافق",
                    Icon: Love,

                    onPress: () => console.log("Go Profile"),
                  },
                  {
                    name: "vvvvv",
                    label: "الدردشة",
                    Icon: Chat,

                    onPress: () => console.log("Go Home"),
                  },
                  {
                    name: "azeaze",
                    label: "التاروت",
                    Icon: Tarrot,

                    onPress: () => console.log("Go Profile"),
                  },
                  {
                    name: "zereghbdv",
                    label: "التعليم",
                    Icon: Education,

                    onPress: () => console.log("Go Home"),
                  },
                ]}
              />
            )}
          </View>
        )}
      </NavigationContainer>
      <BottomDrawer currentRouteName={currentRoute} isLoggedIn={isLoggedIn} />
            <Toast />

    </>
  );
};

export default AppInner;

const styles = StyleSheet.create({
  container: { flex: 1 },
  stackContainer: { flex: 1 }, // fills space above the bottom tab
});
