import type { RootStackParamList } from "@/types/navigation";
import { createNavigationContainerRef } from "@react-navigation/native";

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

// ⬅️ USE THE EXACT TYPE OF navigationRef.navigate
type NavigateFunction = typeof navigationRef.navigate;

export const navigate: NavigateFunction = (...args: Parameters<typeof navigationRef.navigate>) => {
  if (navigationRef.isReady()) {
    navigationRef.navigate(...args);
  } else {
    const interval = setInterval(() => {
      if (navigationRef.isReady()) {
        clearInterval(interval);
        navigationRef.navigate(...args);
      }
    }, 50);
  }
};
