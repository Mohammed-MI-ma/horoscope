import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyB_d5dLX_dpU883dNSi12BTXdSbIkQXcO4",
  authDomain: "nojoum-4d990.firebaseapp.com",
  projectId: "nojoum-4d990",
  storageBucket: "nojoum-4d990.firebasestorage.app",
  messagingSenderId: "224669170130",
  appId: "1:224669170130:web:d8b51cefadc3300861300b",
  measurementId: "G-L3GHTRBNWY"
};

// Initialize Firebase app only once
const app = initializeApp(firebaseConfig);

// Initialize Auth with AsyncStorage persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { app, auth };
