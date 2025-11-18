// src/screens/Login/ui/LoginScreen.tsx
import { LoginScreenProps } from "@/types/auth.types";
import { AnimatePresence, MotiView } from "moti";
import React from "react";
import {
  ActivityIndicator,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useLoginController } from "../contoller/LoginController";

import HeaderBack from "@/components/atomic/HeaderBack/ui/HeaderBack.ui";
import { styles } from "../styles/LoginScreen.styles";

import GlobalStatusBar from "@/components/atomic/GlobalStatusBar/GlobalStatusBar";
import { useAssets } from "@/contexts/AssetsContext";
import { useRTL } from "@/contexts/RTLContext";
import { useAppFont } from "@/hooks/useAppFont";
import { useTranslation } from "react-i18next";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const { formik, visible, isLoginInProgress, triggerExit, handleGoogleLogin } =
    useLoginController(navigation);
  const { loadedAssets } = useAssets();
  const fontFamily = useAppFont();
  const { isRtl: isRTL } = useRTL();

  const { t } = useTranslation();
  return (
    <AnimatePresence>
      {visible && (
        <MotiView
          key="loginScreen"
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={styles.container}
        >
          <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
              <GlobalStatusBar backgroundColor="white" />
              <>
                <HeaderBack />
                <Image
                  source={{ uri: loadedAssets?.logoD }}
                  style={[{ width: 70, height: 70 }]}
                  resizeMode="contain"
                />
                <Text style={[styles.title, { fontFamily: fontFamily }]}>
                  {t("auth.loginTitle")}
                </Text>
                <Text style={[styles.subtitle, { fontFamily: fontFamily }]}>
                  {t("auth.pleaseLogin")}
                </Text>

                {formik.values.loginMethod === "email" && (
                  <>
                    <TextInput
                      style={[
                        styles.input,
                        {
                          textAlign: isRTL ? "right" : "left",
                          writingDirection: isRTL ? "rtl" : "ltr",
                          fontFamily: fontFamily,
                        },
                      ]}
                      placeholder={t("auth.email")}
                      value={formik.values.email}
                      onChangeText={formik.handleChange("email")}
                      onBlur={formik.handleBlur("email")}
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                    {formik.touched.email && formik.errors.email && (
                      <Text style={styles.error}>{formik.errors.email}</Text>
                    )}

                    <TextInput
                      style={styles.input}
                      placeholder={t("auth.password")}
                      value={formik.values.password}
                      onChangeText={formik.handleChange("password")}
                      onBlur={formik.handleBlur("password")}
                      secureTextEntry
                    />
                    {formik.touched.password && formik.errors.password && (
                      <Text style={styles.error}>{formik.errors.password}</Text>
                    )}
                  </>
                )}

                <TouchableOpacity
                  style={styles.recaptchaButton}
                  onPress={() =>
                    formik.setFieldValue("recaptchaToken", "dummy-token")
                  }
                >
                  <Text style={styles.recaptchaText}>
                    {t("auth.completeCaptcha")}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.button}
                  onPress={formik.handleSubmit as any}
                  disabled={isLoginInProgress}
                >
                  {isLoginInProgress ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.buttonText}>{t("auth.login")}</Text>
                  )}
                </TouchableOpacity>

                {/* Social login buttons (placeholders) */}
                <View style={styles.socialContainer}>
                  <TouchableOpacity
                    style={[
                      styles.socialButton,
                      { backgroundColor: "#DB4437" },
                    ]}
                    onPress={handleGoogleLogin} // from controller
                  >
                    <Text style={styles.socialText}>{t("auth.google")}</Text>
                  </TouchableOpacity>
                </View>
              </>
            </SafeAreaView>
          </SafeAreaProvider>
        </MotiView>
      )}
    </AnimatePresence>
  );
}
