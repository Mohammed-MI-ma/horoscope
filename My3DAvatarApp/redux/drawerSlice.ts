import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 1. Define the shape of your state
export type DrawerPlacement = "bottom" | "top" | "left" | "right";

export interface ActiveCategory {
  id: string;
  partner: string;
}

export interface DrawerState {
  open: boolean;
  title: string;
  placement: DrawerPlacement;
  contentType: string | null;
  activeCategory: ActiveCategory | null;
}

// 2. Define payload type for openDrawer action
export interface OpenDrawerPayload {
  title?: string;
  placement?: DrawerPlacement;
  contentType?: string | null;
  activeCategory?: ActiveCategory | null;
}

// 3. Initial state
const initialState: DrawerState = {
  open: false,
  title: "Global Drawer",
  placement: "bottom",
  contentType: null,
  activeCategory: null,
};

// 4. Create slice
const drawerSlice = createSlice({
  name: "drawer",
  initialState,
  reducers: {
    openDrawer: (state, action: PayloadAction<OpenDrawerPayload | undefined>) => {
      state.open = true;
      state.title = action.payload?.title ?? "Global Drawer";
      state.placement = action.payload?.placement ?? "bottom";
      state.contentType = action.payload?.contentType ?? null;
      state.activeCategory = action.payload?.activeCategory ?? null;
    },
    closeDrawer: (state) => {
      state.open = false;
      state.contentType = null;
      state.activeCategory = null;
    },
  },
});

// 5. Export actions & reducer
export const { openDrawer, closeDrawer } = drawerSlice.actions;
export default drawerSlice.reducer;
