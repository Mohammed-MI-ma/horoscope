import { ReactNode, Suspense } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NativeBaseProvider, ColorMode, StorageManager } from "native-base";
import { I18nextProvider } from "react-i18next";
import { Host } from "react-native-portalize";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Text } from "react-native";

import { store, persistor, RootStateType } from "../store";
import { setDarkMode } from "../redux/applicationSlice";

import customTheme from "../constants/theme";
import i18n from "../utils/initializeI18n";

import { FontProvider } from "../contexts/FontProvider";
import { GlobalLoaderProvider } from "../contexts/GlobalLoaderContext";
import { MessageProvider } from "../contexts/MessageProvider";
import { RTLProvider } from "../contexts/RTLContext";
import { I18nProvider } from "../contexts/I18nProvider";
import { AuthProvider } from "../contexts/AuthContext";

import GlobalLoader from "../components/atomic/GlobalLoader/GlobalLoader";
import GlobalStatusBar from "../components/atomic/GlobalStatusBar/GlobalStatusBar";

type Props = {
  children: ReactNode;
};

/* ---------------------------------- */
/* NativeBase + Redux color sync       */
/* ---------------------------------- */
const colorModeManager: StorageManager = {
  get: async () => {
    const state = store.getState() as RootStateType;
    return state.application.isDarkMode ? "dark" : "light";
  },
  set: async (value: ColorMode) => {
    store.dispatch(setDarkMode(value === "dark"));
  },
};

/* ---------------------------------- */
/* React Query client                  */
/* ---------------------------------- */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      refetchOnReconnect: true,
      refetchOnWindowFocus: false,
    },
  },
});

export function AppProviders({ children }: Props) {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <PersistGate loading={<Text />} persistor={persistor}>
              <NativeBaseProvider
                theme={customTheme}
                colorModeManager={colorModeManager}
              >
                <GlobalStatusBar />
                <I18nextProvider i18n={i18n}>
                  <Host>
                    <GlobalLoaderProvider>
                      <FontProvider>
                        <I18nProvider>
                          <RTLProvider>
                            <MessageProvider>
                              <AuthProvider>
                                <Suspense
                                  fallback={
                                    <GlobalLoader message="Loading assets..." />
                                  }
                                >
                                  {children}
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
          </QueryClientProvider>
        </Provider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
