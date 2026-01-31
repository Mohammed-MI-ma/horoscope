import React, { memo } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
} from "react-native";
import Arrow from "@/assets/svg/arrow.svg";
import PressableMoti from "../PressableMoti/PressableMoti";
import { useConsentNavigationButton } from "./ConsentNavigationButton.controller";
import { styles } from "./ConsentNavigationButton.styles";

type ConsentNavigationButtonProps = {
  title: string;
  onNavigate: () => void;
  loading?: boolean;
  /** Does this action legally require consent? (e.g. first signup) */
  requiresConsent?: boolean;
  consentGiven?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  titleFont?: string;
  showArrow?: boolean;
};

const ConsentNavigationButton: React.FC<ConsentNavigationButtonProps> = memo(
  ({
    title,
    onNavigate,
    loading = false,
    requiresConsent = false,

    consentGiven = false,
    containerStyle,
    titleFont = "System",
    showArrow = true,
  }) => {
    const isBlocked = requiresConsent && !consentGiven;

    const handlePress = useConsentNavigationButton(
      onNavigate,
      isBlocked,
      loading
    );

    return (
      <PressableMoti onPress={handlePress} disabled={isBlocked || loading}>
        <View
          style={[
            containerStyle,
            { opacity: isBlocked ? 0.35 : 1, paddingVertical: 10 },
          ]}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={[styles.title, { fontFamily: titleFont }]}>
              {title}
            </Text>
          )}

          {showArrow && !loading && <Arrow width={10} height={10} />}
        </View>
      </PressableMoti>
    );
  }
);

// ✅ Fix ESLint warning by giving the memoized component a displayName
ConsentNavigationButton.displayName = "ConsentNavigationButton";

export default ConsentNavigationButton;
