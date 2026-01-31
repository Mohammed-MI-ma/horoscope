import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type OverlayType =
  | "pleaseLoginAnimation"
  | "locked"
  | "loading"
  | null;

interface GlobalOverlayState {
  type: OverlayType;
  message?: string;
}

const initialState: GlobalOverlayState = {
  type: null,
};

const globalOverlaySlice = createSlice({
  name: "globalOverlay",
  initialState,
  reducers: {
    showOverlay: (
      state,
      action: PayloadAction<{ type: OverlayType; message?: string }>
    ) => {
      state.type = action.payload.type;
      state.message = action.payload.message;
    },
    hideOverlay: (state) => {
      state.type = null;
      state.message = undefined;
    },
  },
});

export const { showOverlay, hideOverlay } = globalOverlaySlice.actions;
export default globalOverlaySlice.reducer;
