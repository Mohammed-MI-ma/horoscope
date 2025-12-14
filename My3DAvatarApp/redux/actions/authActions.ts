// src/redux/actions/authActions.ts
import { app } from "@/firebase/config"; // just the app
import {
  setError,
  setLoading,
} from "@/redux/authSlice";
import {
  LoginFormValues,
  LoginResponsePayload,
} from "@/types/ValidationSchema";
import i18n from "@/utils/initializeI18n";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
  signInWithEmailAndPassword,
} from "firebase/auth";
import * as Keychain from "react-native-keychain";
import { Dispatch } from "redux";

// ✅ Email/password login
export const loginUser =
  (postData: LoginFormValues) =>
  async (dispatch: Dispatch): Promise<LoginResponsePayload> => {
    const auth = getAuth(app);

    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      const { loginMethod, email, password, recaptchaToken } = postData;

      if (!recaptchaToken) {
        throw new Error(i18n.t("auth.recaptchaRequired"));
      }

      if (loginMethod !== "email") {
        throw new Error(i18n.t("auth.socialLoginNotImplemented"));
      }

      await signInWithEmailAndPassword(auth, email!, password!);

      return {
        status: true,
        message: i18n.t("auth.loginSuccess"),
        userData: null,
        idToken: null,
        provider: "email",
        refreshToken: null,
      };
    } catch (err: any) {
      console.error("Firebase login error:", err);
      dispatch(setError(err.message));

      return {
        status: false,
        message: err.message,
        userData: null,
        idToken: null,
        provider: postData.loginMethod,
        refreshToken: null,
      };
    } finally {
      dispatch(setLoading(false));
    }
  };


// ✅ Google login using Firebase credential (native)
export const loginWithGoogleFirebase =
  (idTokenFromExpo: string) =>
  async (dispatch: Dispatch): Promise<LoginResponsePayload> => {
    const auth = getAuth(app); // initialize here locally for RN native

    const response: LoginResponsePayload = {
      status: false,
      message: "",
      userData: null,
      idToken: null,
      provider: "google",
      refreshToken: null,
    };

    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      const credential = GoogleAuthProvider.credential(idTokenFromExpo);
      const userCredential = await signInWithCredential(auth, credential);
      const user = userCredential.user;
      const idToken = await user.getIdToken();

      // Securely store token
      await Keychain.setGenericPassword("firebaseToken", idToken, {
        service: "firebaseToken",
      });

      response.status = true;
      response.message = i18n.t("auth.loginSuccess");
      response.userData = user;
      response.idToken = idToken;

     // dispatch(setCredentials(user));
     // dispatch(setUserToken(idToken));
    } catch (err: any) {
      console.error("Firebase Google login error:", err);
      response.message = err?.message || i18n.t("auth.loginFailed");
      dispatch(setError(response.message));
    } finally {
      dispatch(setLoading(false));
      return response;
    }
  };
