import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Locale } from '../../i18n/translations';

const getInitialLocale = (): Locale => {
  if (typeof localStorage === 'undefined') return 'en';
  return (localStorage.getItem('fpp_locale') as Locale) ?? 'en';
};

const localeSlice = createSlice({
  name: 'locale',
  initialState: { locale: getInitialLocale() as Locale },
  reducers: {
    setLocale(state, action: PayloadAction<Locale>) {
      state.locale = action.payload;
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('fpp_locale', action.payload);
      }
    },
  },
});

export const { setLocale } = localeSlice.actions;
export default localeSlice.reducer;
