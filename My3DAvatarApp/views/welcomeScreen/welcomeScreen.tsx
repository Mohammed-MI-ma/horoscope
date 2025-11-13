import { useRTL } from "@/contexts/RTLContext";
import type { TFunction } from "i18next";
import React, { useTransition } from "react";
import { useTranslation } from "react-i18next";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

import GlobalStatusBar from "@/components/atomic/GlobalStatusBar/GlobalStatusBar";
import { styles } from "./welcomeScreen.styles";

// Types
interface WelcomeScreenProps {
  navigation: {
    navigate: (screen: string) => void;
  };
}

export default function WelcomeScreen({ navigation }: WelcomeScreenProps) {
  const { t }: { t: TFunction } = useTranslation();
  const language = useSelector((state: any) => state.application.language);
  const isArabic = language === "ar";
  const { isRtl: isRTL } = useRTL();
  const [isPending, startTransition] = useTransition();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <GlobalStatusBar />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
