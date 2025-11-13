import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Appearance, I18nManager } from "react-native";

// 1. Define the shape of your state
interface SelectedChoice {
  id: string | null;
}

interface ApplicationState {
  language: string;
  selectedChoice: SelectedChoice;

  isRTL: boolean;
  isDarkMode: boolean;
  fontsLoaded: boolean;
}

// 2. Create initial state with proper typing
const initialState: ApplicationState = {
  selectedChoice: {
    id: null,
  },
  language: "ar",
  isRTL: I18nManager.isRTL,
  isDarkMode: Appearance.getColorScheme() === "dark",
  fontsLoaded: false,
};

// 3. Create the slice
const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<string>) {
      state.language = action.payload;
      state.isRTL = action.payload === "ar";
    },
    setDarkMode(state, action: PayloadAction<boolean>) {
      state.isDarkMode = action.payload;
    },
    setFontsLoaded(state, action: PayloadAction<boolean>) {
      state.fontsLoaded = action.payload;
    },

    setSelectedChoice: {
      reducer: (state, action: PayloadAction<SelectedChoice>) => {
        state.selectedChoice = action.payload;
      },
      prepare: (id: string | null) => ({
        payload: { id },
      }),
    },
  },
});

// 4. Export actions and reducer
export const { setSelectedChoice, setLanguage, setDarkMode, setFontsLoaded } =
  applicationSlice.actions;

export default applicationSlice.reducer;
