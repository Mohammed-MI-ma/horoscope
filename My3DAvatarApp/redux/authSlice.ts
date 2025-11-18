// src/redux/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "firebase/auth";

export interface AuthState {
  userInfo: User | null;
  accessToken: string | null;
  isUserLoggedIn: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  userInfo: null,
  accessToken: null,
  isUserLoggedIn: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.userInfo = null;
      state.accessToken = null;
      state.isUserLoggedIn = false;
      state.loading = false;
      state.error = null;
    },
    setCredentials: (state, action: PayloadAction<User>) => {
      state.userInfo = action.payload;
      state.isUserLoggedIn = true;
    },
    setUserToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
    setUserIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isUserLoggedIn = action.payload;
    },
  },
});

export const { logout, setCredentials, setUserToken, setLoading, setError, setUserIsLoggedIn } = authSlice.actions;
export default authSlice.reducer;
