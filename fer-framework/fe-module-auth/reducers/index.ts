import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Kiểu dữ liệu cho thông tin user
interface UserProfile {
  id: string;
  username: string;
  email: string;
  role: string;
  status: string;
  full_name: string;
  avatar_url: string;
  created_at: string;
}

interface UserState {
  user: UserProfile | null;
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (
      state,
      action: PayloadAction<{ user: UserProfile; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {},
  selectors: {
    getUser: (state) => state.user,
  },
});

export const authActions = authSlice.actions;

export const authSelectors = authSlice.selectors;

export default authSlice.reducer;
