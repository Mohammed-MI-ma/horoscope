import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useRef, useState } from "react";

interface UseBackExitProps {
  duration?: number; // exit animation duration
  disable?: boolean; // disable back exit
  preventAccidental?: boolean; // require double-press to exit
  onBeforeExit?: () => void; // run before exit animation
  onAfterExit?: () => void; // run after exit animation
  toast?: (msg: string) => void; // show message for double press
}

export const useBackExit = ({
  duration = 250,
  disable = false,
  preventAccidental = true,
  onBeforeExit,
  onAfterExit,
  toast,
}: UseBackExitProps) => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [visible, setVisible] = useState(true);
  const exitingRef = useRef(false);
  const lastBackPress = useRef(0);

  const progress = visible ? 1 : 0;

  // ---- EXIT LOGIC ----
  const triggerExit = useCallback(() => {
    if (disable || exitingRef.current) return;
    exitingRef.current = true;

    onBeforeExit?.();
    setVisible(false);

    setTimeout(() => {
      onAfterExit?.();
      navigation.goBack();
    }, duration);
  }, [disable, duration, navigation, onBeforeExit, onAfterExit]);

  // ---- HANDLE BACK PRESS ----
const handleBack = useCallback(() => {
  console.log("🔙 [BackHandler] Back pressed");
  console.log("isFocused:", isFocused);
  console.log("disable:", disable);
  console.log("exitingRef:", exitingRef.current);

  if (!isFocused || disable || exitingRef.current) {
    console.log("🔙 Blocked back press");
    return true;
  }

  if (!preventAccidental) {
    console.log("🚪 Exiting immediately...");
    triggerExit();
    return true;
  }

  const now = Date.now();
  console.log("⏱ Time since last press:", now - lastBackPress.current);

  if (now - lastBackPress.current < 1500) {
    console.log("🚪 Double pressed — exiting");
    triggerExit();
    return true;
  }

  console.log("⚠️ First press — waiting for second");
  lastBackPress.current = now;
  toast?.("Press again to exit");

  return true;
}, [isFocused, disable, preventAccidental, toast, triggerExit]);

  // ---- ANDROID HARDWARE BACK ----
// ---- ANDROID HARDWARE BACK ----



  // ---- iOS SWIPE-BACK OVERRIDE ----
  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", (e) => {
      if (disable || exitingRef.current) return;

      e.preventDefault(); // stop default swipe gesture
      triggerExit();
    });

    return unsubscribe;
  }, [disable, navigation, triggerExit]);

  return {
    visible,
    triggerExit,
    progress,
    exiting: exitingRef.current,
    handleBack, // expose this for UI button
  };
};
