import { useMessage } from "@/contexts/MessageProvider";
import { useAppDispatch } from "@/hooks/hooks";
import {
  loginUser,
  loginWithGoogleFirebase,
} from "@/redux/actions/authActions";
import { LoginFormValues, loginSchema } from "@/types/ValidationSchema";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { useGoogleAuth } from "@/config/useGoogleAuth";

export const useLoginController = (navigation: any) => {
  const dispatch = useAppDispatch();
  const message = useMessage();
  const { t } = useTranslation();

  const [isLoginInProgress, setIsLoginInProgress] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState("");

  // Google login hook
  const { request, response, promptAsync } = useGoogleAuth();

  // Automatically handle Google login
  useEffect(() => {
    if (response?.type === "success") {
      const id_token = response.params.id_token;
      handleGoogleLoginCallback(id_token);
    }
  }, [response]);

  const handleGoogleLoginCallback = async (idToken: string) => {
    setIsLoginInProgress(true);
    try {
      const res = await dispatch(loginWithGoogleFirebase(idToken));
      if (res.status) message.success(t("auth.loginSuccess"));
      else message.warning(res.message || t("auth.loginFailed"));
    } catch (err: any) {
      console.error("Google login error:", err);
      message.error(err?.message || t("auth.loginFailed"));
    } finally {
      setIsLoginInProgress(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoginInProgress(true);
    await promptAsync();
  };

  // Formik for email/password login
  const formik = useFormik<LoginFormValues>({
    initialValues: {
      loginMethod: "email",
      email: "",
      password: "",
      recaptchaToken: "", // <-- required for type safety
    },
    validationSchema: loginSchema(t),
    onSubmit: async (values) => {
      if (!recaptchaToken) {
        message.warning(t("auth.recaptchaRequired"));
        return;
      }

      setIsLoginInProgress(true);
      try {
        console.log(values, "Submitting login with recaptchaToken:", recaptchaToken);
        const res = await dispatch(
          loginUser({
            ...values,
            recaptchaToken, // send the token only here
          })
        );

        if (res.status) message.success(t("auth.loginSuccess"));
        else message.warning(res.message || t("auth.loginFailed"));
      } catch (err: any) {
        console.error("Login error:", err);
        message.error(err?.message || t("auth.loginFailed"));
      } finally {
        setRecaptchaToken(""); // clear token after submit
        setIsLoginInProgress(false);
      }
    },
  });

  const setLoginMethod = (method: LoginFormValues["loginMethod"]) => {
    formik.setFieldValue("loginMethod", method);
  };

  return {
    formik,
    isLoginInProgress,
    setLoginMethod,
    handleGoogleLogin,
    recaptchaToken,
    setRecaptchaToken,
  };
};
