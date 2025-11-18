// store.ts
import "react-native-get-random-values";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore } from "@reduxjs/toolkit";
import { PersistConfig, persistReducer, persistStore } from "redux-persist";
import { encryptTransform } from "redux-persist-transform-encrypt";
import applicationReducer from "./redux/applicationSlice";
import drawerReducer from "./redux/drawerSlice";

// Types
export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Persist config
const persistConfig: PersistConfig<any> = {
  key: "root",
  storage: AsyncStorage,
  transforms: [
    encryptTransform({
      secretKey: process.env.EXPO_PUBLIC_SECRET_KEY || "defaultSecretKey",
      onError: (err) => console.error("Encryption error:", err),
    }),
  ],
};

// Wrap reducer
const persistedApplicationReducer = persistReducer(
  { ...persistConfig, key: "application" },
  applicationReducer
);
const persistedDrawerReducer = persistReducer(
  { ...persistConfig, key: "drawer" },
  drawerReducer
);

// Configure store
export const store = configureStore({
  reducer: { application: persistedApplicationReducer, drawer: persistedDrawerReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }), // needed for redux-persist
  devTools: process.env.NODE_ENV !== "production",
});

// Persistor
export const persistor = persistStore(store);
export default { store, persistor };
