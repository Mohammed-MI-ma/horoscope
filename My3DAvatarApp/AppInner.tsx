import React, { useEffect, useState, useTransition } from "react";
import { StyleSheet, Text, View } from "react-native";

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
import LoginScreen from "./views/LoginScreen/ui/LoginScreen";
import OnBoardingScreen from "./views/OnBoardingScreen/OnBoardingScreen";
import WelcomeScreen from "./views/welcomeScreen/welcomeScreen";

// Bottom Tab
import BottomDrawer from "./components/BottomDrawer/ui/BottomDrawer";
import { NavigationBottomTab } from "./components/feature/NavigationBottomTab/NavigationBottomTab";
import { navigationRef } from "./navigation/navigationRef";
import { openDrawer } from "./redux/drawerSlice";

const Stack = createNativeStackNavigator();

const AppInner = () => {
  const { hideLoader } = useGlobalLoader();
  const [ready, setReady] = useState(false);

  const [isPending, startTransition] = useTransition();
  const [currentRoute, setCurrentRoute] = React.useState<string>("");

  const isDarkMode = useSelector(
    (state: RootStateType) => state.application.isDarkMode
  );
  const { colorMode, toggleColorMode } = useColorMode();
  const isLoggedIn = false;
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

  const handleTabPress = (tabName: string) => {
    if (isLoggedIn) {
    } else {
      // Open drawer
      console.log("porno");
      dispatch(
        openDrawer({
          title: "Category Details",
          placement: "bottom",
          contentType: "category-details",
          activeCategory: { id: "item.id", partner: "item.partner" },
        })
      );
    }
  };
  if (!ready) return <Text>Switching screens...</Text>;

  return (
    <>
      <NavigationContainer
        ref={navigationRef}
        onReady={() => {
          console.log("Navigation is ready");

          setCurrentRoute(navigationRef.getCurrentRoute()?.name || "");
        }}
        onStateChange={() =>
          setCurrentRoute(navigationRef.getCurrentRoute()?.name || "")
        }
      >
        {isPending ? (
          <Text>Switching screens...</Text>
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
                  <Stack.Screen name="LoginScreen" component={LoginScreen} />
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
                    onPress: () => handleTabPress("OnBoardingScreen"),
                  },
                  {
                    name: "Profile",
                    label: "التوافق",
                    Icon: Love,

                    onPress: () => console.log("Go Profile"),
                  },
                  {
                    name: "Home",
                    label: "الدردشة",
                    Icon: Chat,

                    onPress: () => console.log("Go Home"),
                  },
                  {
                    name: "Profile",
                    label: "التاروت",
                    Icon: Tarrot,

                    onPress: () => console.log("Go Profile"),
                  },
                  {
                    name: "Home",
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
      <BottomDrawer currentRouteName={currentRoute} />
    </>
  );
};

export default AppInner;

const styles = StyleSheet.create({
  container: { flex: 1 },
  stackContainer: { flex: 1 }, // fills space above the bottom tab
});
