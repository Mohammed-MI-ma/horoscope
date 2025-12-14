// __REACT_IMPORTS

import { JSX, Suspense } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";

// __NB_IMPORTS
import { ColorMode, NativeBaseProvider, StorageManager } from "native-base";
import { SafeAreaProvider } from "react-native-safe-area-context";

// i18n setup
import { I18nextProvider } from "react-i18next";
import { enableScreens } from "react-native-screens";
import { I18nProvider } from "./contexts/I18nProvider";

// __CONTEXTS_IMPORTS__
import { Host } from "react-native-portalize";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import i18n from "./utils/initializeI18n";

// __STORE__
import AppInner from "./AppInner";
import GlobalLoader from "./components/atomic/GlobalLoader/GlobalLoader";
import customTheme from "./constants/theme";
import { FontProvider } from "./contexts/FontProvider";
import { GlobalLoaderProvider } from "./contexts/GlobalLoaderContext";
import { MessageProvider } from "./contexts/MessageProvider";
import { RTLProvider } from "./contexts/RTLContext";
import { setDarkMode } from "./redux/applicationSlice";
import { RootStateType, persistor, store } from "./store";
import { Text } from "react-native";
import { AuthProvider } from "./contexts/AuthContext";
import GlobalStatusBar from "./components/atomic/GlobalStatusBar/GlobalStatusBar";

// Enable native screens for better performance
enableScreens();

// ⚙️ NativeBase color mode manager linked to Redux Persist
const colorModeManager: StorageManager = {
  get: async () => {
    const state = store.getState() as RootStateType;
    return state.application.isDarkMode ? "dark" : "light";
  },
  set: async (value: ColorMode) => {
    store.dispatch(setDarkMode(value === "dark"));
  },
};

export default function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Provider store={store}>
          <PersistGate loading={<Text>qsdqsd</Text>} persistor={persistor}>
            <NativeBaseProvider
              theme={customTheme}
              colorModeManager={colorModeManager}
            >
              <GlobalStatusBar /> {/* global, top-level */}
              <I18nextProvider i18n={i18n}>
                <Host>
                  <GlobalLoaderProvider>
                    <FontProvider>
                      <I18nProvider>
                        <RTLProvider>
                          <MessageProvider>
                            {/* 🔐 AUTH GOES HERE */}
                            <AuthProvider>
                              <Suspense
                                fallback={
                                  <GlobalLoader message="Loading assets..." />
                                }
                              >
                                <AppInner />
                              </Suspense>
                            </AuthProvider>
                          </MessageProvider>
                        </RTLProvider>
                      </I18nProvider>
                    </FontProvider>
                  </GlobalLoaderProvider>
                </Host>
              </I18nextProvider>
            </NativeBaseProvider>
          </PersistGate>
        </Provider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
