import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  id: string | null;
  email: string | null;
  name: string | null;
  permissions: string[];
  isAuthenticated: boolean;
  token: string | null;
}

const initialState: UserState = {
  id: null,
  email: null,
  name: null,
  permissions: [],
  isAuthenticated: false,
  token: typeof localStorage !== 'undefined' ? localStorage.getItem('fpp_token') : null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(
      state,
      action: PayloadAction<{
        id: string;
        email: string;
        name: string;
        permissions: string[];
        token: string;
      }>
    ) {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.permissions = action.payload.permissions;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('fpp_token', action.payload.token);
      }
    },
    clearUser(state) {
      state.id = null;
      state.email = null;
      state.name = null;
      state.permissions = [];
      state.token = null;
      state.isAuthenticated = false;
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem('fpp_token');
      }
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
