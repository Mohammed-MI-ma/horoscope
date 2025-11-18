import { useNavigation } from "@react-navigation/native";
import { I18nManager } from "react-native";

export const useHeaderBackController = (onBack?: () => void) => {
  const navigation = useNavigation();
  const isRTL = I18nManager.isRTL;

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigation.goBack();
    }
  };

  return { handleBack, isRTL };
};
