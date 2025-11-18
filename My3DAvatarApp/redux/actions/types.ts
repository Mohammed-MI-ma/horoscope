/*************** Auth ******************/
export const AUTH_LOGIN_CHECK = "AUTH_LOGIN_CHECK" as const;
export const CHANGE_LOGIN_INPUT = "CHANGE_LOGIN_INPUT" as const;
export const CHANGE_REGISTER_INPUT = "CHANGE_REGISTER_INPUT" as const;
export const AUTH_GET_LOGIN_DATA = "AUTH_GET_LOGIN_DATA" as const;

export const AUTH_REGISTER_SUBMIT = "AUTH_REGISTER_SUBMIT" as const;
export const AUTH_REGISTER_CENTER_SUBMIT = "AUTH_REGISTER_CENTER_SUBMIT" as const;
export const GET_AUTH_DATA = "GET_AUTH_DATA" as const;
export const AUTH_LOGOUT = "AUTH_LOGOUT" as const; // renamed from POST_LOGOUT
export const AUTH_LOGOUT_LOADING = "AUTH_LOGOUT_LOADING" as const;
/*************** Auth ******************/

export const AUTH_REGISTER_EMPTY_FIELD = "AUTH_REGISTER_EMPTY_FIELD" as const;
export const FORGOTTEN_PASSWORD = "FORGOTTEN_PASSWORD" as const;

export const RESET_PASSWORD_LINK_REQUEST = "RESET_PASSWORD_LINK_REQUEST" as const;
export const RESET_PASSWORD = "RESET_PASSWORD" as const;

export const SEARCHING_FOR_BENEFICIAIRE = "SEARCHING_FOR_BENEFICIAIRE" as const;

// 🔹 Updated type to match Firebase-based login
export type AuthActionType =
  | typeof AUTH_LOGIN_CHECK
  | typeof CHANGE_LOGIN_INPUT
  | typeof CHANGE_REGISTER_INPUT
  | typeof AUTH_GET_LOGIN_DATA
  | typeof AUTH_REGISTER_SUBMIT
  | typeof AUTH_REGISTER_CENTER_SUBMIT
  | typeof GET_AUTH_DATA
  | typeof AUTH_LOGOUT
  | typeof AUTH_LOGOUT_LOADING
  | typeof AUTH_REGISTER_EMPTY_FIELD
  | typeof FORGOTTEN_PASSWORD
  | typeof RESET_PASSWORD_LINK_REQUEST
  | typeof RESET_PASSWORD
  | typeof SEARCHING_FOR_BENEFICIAIRE;
