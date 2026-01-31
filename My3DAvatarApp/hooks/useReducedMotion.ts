import { useState, useEffect } from "react";
import { AccessibilityInfo, Platform } from "react-native";

/**
 * Returns true if user prefers reduced motion.
 */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (Platform.OS === "web") return; // web handled separately
    AccessibilityInfo.isReduceMotionEnabled().then(setReduced);
    const listener = AccessibilityInfo.addEventListener(
      "reduceMotionChanged",
      setReduced
    );
    return () => {
      listener.remove?.();
    };
  }, []);

  return reduced;
}
