import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type ThemeMode = 'light' | 'dark';

interface ThemeState {
  mode: ThemeMode;
  primaryColor: string;
}

const getInitialMode = (): ThemeMode => {
  if (typeof localStorage === 'undefined') return 'light';
  return (localStorage.getItem('fpp_theme') as ThemeMode) ?? 'light';
};

const getInitialPrimary = (): string => {
  if (typeof localStorage === 'undefined') return 'indigo';
  return localStorage.getItem('fpp_primary') ?? 'indigo';
};

const initialState: ThemeState = {
  mode: getInitialMode(),
  primaryColor: getInitialPrimary(),
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setThemeMode(state, action: PayloadAction<ThemeMode>) {
      state.mode = action.payload;
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('fpp_theme', action.payload);
      }
    },
    toggleTheme(state) {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('fpp_theme', state.mode);
      }
    },
    setPrimaryColor(state, action: PayloadAction<string>) {
      state.primaryColor = action.payload;
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('fpp_primary', action.payload);
      }
    },
  },
});

export const { setThemeMode, toggleTheme, setPrimaryColor } = themeSlice.actions;
export default themeSlice.reducer;
