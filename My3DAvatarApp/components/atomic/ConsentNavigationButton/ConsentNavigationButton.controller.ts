import Toast from "react-native-toast-message";

/**
 * Custom hook to handle press logic for ConsentNavigationButton
 */
export function useConsentNavigationButton(
  onNavigate: () => void,
  isBlocked: boolean,
  loading: boolean
) {
  return () => {
    if (loading) return;

    if (isBlocked) {
      // GDPR-safe explicit feedback
      Toast.show({
        type: "info",
        text1: "Consent required",
        text2: "Please accept the terms to continue",
        position: "top",
      });
      return;
    }

    onNavigate();
  };
}
