// src/screens/Login/LoginController.ts
import { useMessage } from "@/contexts/MessageProvider";
import { useAppDispatch } from "@/hooks/hooks";
import { useBackHandler } from "@/hooks/useBackHandler";
import { loginUser, loginWithGoogleFirebase } from "@/redux/actions/authActions";
import { LoginFormValues, loginSchema } from "@/types/ValidationSchema";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { useFormik } from "formik";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

import { makeRedirectUri } from "expo-auth-session";

WebBrowser.maybeCompleteAuthSession(); // Necessary for Expo Auth Session

export const useLoginController = (navigation: any) => {
  const dispatch = useAppDispatch();
  const message = useMessage();
  const { t } = useTranslation();

  const [visible, setVisible] = useState(true);
  const [isLoginInProgress, setIsLoginInProgress] = useState(false);

  // 🔹 Handle physical back button
  useBackHandler(() => {
    triggerExit();
    return true;
  });

  const triggerExit = useCallback(() => {
    setVisible(false);
    setTimeout(() => navigation.goBack(), 150);
  }, [navigation]);

  // 🔹 Google Auth Session setup
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: "489966643652-ul62rfi8ebgjsoat46mp07472h12j2qj.apps.googleusercontent.com", // Replace with your actual client ID
    redirectUri:makeRedirectUri({ useProxy: true }),

  });

  // Automatically handle Google login result
  const handleGoogleLogin = async () => {
    try {
      setIsLoginInProgress(true);
      const result = await promptAsync();

      if (result.type !== "success") {
        message.warning(t("auth.loginFailed"));
        return;
      }

      const { id_token } = result.params;
      // Dispatch the Redux action to log in with Google
      const res = await dispatch(loginWithGoogleFirebase(id_token));
      if (res.status) {
        message.success(t("auth.loginSuccess"));
      } else {
        message.warning(res.message);
      }
    } catch (err: any) {
      console.error("Google login error:", err);
      message.error(err?.message || t("auth.loginFailed"));
    } finally {
      setIsLoginInProgress(false);
    }
  };

  // ✅ Formik setup for email/password login
  const formik = useFormik<LoginFormValues>({
    initialValues: {
      loginMethod: "email",
      email: "",
      password: "",
      recaptchaToken: "",
    },
    validationSchema: loginSchema(t),
    onSubmit: async (values) => {
      setIsLoginInProgress(true);
      try {
        if (!values.recaptchaToken) {
          message.warning(t("auth.recaptchaRequired"));
          return;
        }

        const response = await dispatch(loginUser(values));

        if (response.status) {
          message.success(t("auth.loginSuccess"));
        } else {
          message.warning(response.message || t("auth.loginFailed"));
        }
      } catch (err: any) {
        console.error("LoginController error:", err);
        message.error(err?.message || t("auth.loginFailed"));
      } finally {
        setIsLoginInProgress(false);
      }
    },
  });

  const setLoginMethod = (method: LoginFormValues["loginMethod"]) => {
    formik.setFieldValue("loginMethod", method);
  };

  return {
    formik,
    visible,
    isLoginInProgress,
    triggerExit,
    setLoginMethod,
    handleGoogleLogin,
    request, // for disabling Google button until ready
  };
};
