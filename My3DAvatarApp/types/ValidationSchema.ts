//__File: ValidationSchema.ts__


import * as yup from "yup";
export interface LoginFormValues {
  loginMethod: "email" | "google" | "facebook" | "apple";
  email?: string;
  password?: string;
  recaptchaToken: string;
}

export interface LoginResponsePayload {
  status: boolean;
  message: string;
  userData: any | null;
  idToken: string | null;
  provider: string;
  refreshToken?: string | null;
}

export const loginSchema = (t: (key: string) => string) =>
  yup.object().shape({
    email: yup
      .string()
      .email(t("auth.invalidEmail"))
      .required(t("auth.emailRequired")),
    password: yup
      .string()
      .min(8, t("auth.passwordMin"))
      .required(t("auth.passwordRequired")),
    recaptchaToken: yup.string().required(t("auth.recaptchaRequired")),
  });
