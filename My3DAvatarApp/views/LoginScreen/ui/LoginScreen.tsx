import { LoginScreenProps } from "@/types/auth.types";
import { MotiView } from "moti";
import {
  ActivityIndicator,
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useTranslation } from "react-i18next";

//__Controller__
import { useLoginController } from "../contoller/LoginController";

import { AssetsProvider } from "@/contexts/AssetsContext";

//__Hooks__
import { useRTL } from "@/contexts/RTLContext";
import { useAppFont } from "@/hooks/useAppFont";
import { SafeAreaView } from "react-native-safe-area-context";

//__Images__
import { welcome_Assets } from "@/images";

//__Components__
import { RecaptchaComponent } from "@/components/atomic/Recaptcha/Recaptcha";
import DividerWithText from "@/components/atomic/DividerWithText/DividerWithText";
import HeaderBack from "@/components/atomic/HeaderBack/ui/HeaderBack.ui";

//__Styles__
import { styles } from "../styles/LoginScreen.styles";
import { useCallback, useState } from "react";
import GMAIL from "@/assets/svg/GMAIL.svg";

function LoginScreenContent({ navigation }: LoginScreenProps) {
  const { formik, isLoginInProgress, handleGoogleLogin, setRecaptchaToken } =
    useLoginController(navigation);
  const fontFamily = useAppFont();
  const { isRtl: isRTL } = useRTL();
  const { t } = useTranslation();
  const [refreshing, setRefreshing] = useState(false);
  const [recaptchaKey, setRecaptchaKey] = useState(Date.now()); // force reload recaptcha

  const [recaptchaVerified, setRecaptchaVerified] = useState(false);
  // --- Pull-to-refresh handler ---
  const onRefresh = useCallback(() => {
    setRefreshing(true);

    // 1. Reset form state
    formik.resetForm();

    // 2. Reset recaptcha state
    setRecaptchaVerified(false);
    setRecaptchaToken("");

    // 3. Force Recaptcha reload by changing key
    setRecaptchaKey(Date.now());

    // 4. Optional: reload any other screen data

    setTimeout(() => setRefreshing(false), 800); // short delay for UX
  }, [formik]);
  return (
    <MotiView
      from={{ opacity: 0.75 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0.75 }}
      transition={{ duration: 350, type: "timing" }}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "row-reverse",
              alignItems: "center",
            }}
          >
            <HeaderBack />

            <Image
              source={{ uri: welcome_Assets.logoD }}
              style={{
                width: 70,
                height: 20,
              }}
              resizeMode="contain"
            />
          </View>
          <Text style={[styles.title, { fontFamily }]}>
            {t("auth.loginTitle")}
          </Text>
          <Text style={[styles.subtitle, { fontFamily }]}>
            {t("auth.pleaseLogin")}
          </Text>
          <View style={styles.socialContainer}>
            <TouchableOpacity
              style={[styles.socialButton, { backgroundColor: "#DB4437" }]}
              onPress={handleGoogleLogin}
              disabled={isLoginInProgress}
            >
              {isLoginInProgress ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <View
                  style={{
                    flexDirection: "row-reverse",
                    gap: 9,
                    alignItems: "center",
                  }}
                >
                  <GMAIL width={20} height={20} />
                  <Text style={[styles.socialText, { fontFamily }]}>
                    {t("auth.google")}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
          <DividerWithText text={t("or")} />
          {/* Email/Password form */}
          {formik.values.loginMethod === "email" && (
            <>
              <TextInput
                style={[
                  styles.input,
                  {
                    textAlign: isRTL ? "right" : "left",
                    writingDirection: isRTL ? "rtl" : "ltr",
                    fontFamily,
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
                style={[
                  styles.input,
                  {
                    textAlign: isRTL ? "right" : "left",
                    writingDirection: isRTL ? "rtl" : "ltr",
                    fontFamily,
                  },
                ]}
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
            style={[
              styles.button,
              { opacity: recaptchaVerified && !isLoginInProgress ? 1 : 0.5 },
            ]}
            onPress={formik.handleSubmit as any}
            disabled={!recaptchaVerified || isLoginInProgress} // disable if token not verified or login in progress
          >
            {isLoginInProgress ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={[styles.buttonText, { fontFamily }]}>
                {t("auth.login")}
              </Text>
            )}
          </TouchableOpacity>
          {/* Social login */}
          {/* Recaptcha */}
          <RecaptchaComponent
            key={recaptchaKey} // reload when key changes
            maxRetries={3} // optional
            onVerify={(response) => {
              console.log("Recaptcha response:", response);
              if (response.success) {
                console.log("Human verified!");
                setRecaptchaVerified(true);
                setRecaptchaToken(response.data.token); // store token for login
                formik.setFieldValue("recaptchaToken", response.data.token);
              } else {
                console.log("Verification failed");
                setRecaptchaVerified(false);
                setRecaptchaToken(""); // clear invalid token
              }
            }}
          />
        </ScrollView>
        {/* Email login button */}
      </SafeAreaView>
    </MotiView>
  );
}

// Wrap the content in its own AssetsProvider
export default function LoginScreen(props: LoginScreenProps) {
  return (
    <AssetsProvider
      assetsToLoad={welcome_Assets ?? {}}
      fallback={
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#ffffff" />
          <Text style={{ marginTop: 12, color: "white" }}>
            Loading assets...
          </Text>
        </View>
      }
    >
      <LoginScreenContent {...props} />
    </AssetsProvider>
  );
}
