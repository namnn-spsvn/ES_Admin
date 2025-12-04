import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authApis } from "../apis";

// Kiểu dữ liệu cho thông tin user
interface UserProfile {
  _id: string;
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(authApis.endpoints.getUser.matchPending, (state) => {})
      .addMatcher(
        authApis.endpoints.getUser.matchFulfilled,
        (state, action: any) => {
          return action.payload;
        }
      )
      .addMatcher(
        authApis.endpoints.getUser.matchRejected,
        (state, action) => {}
      );
  },
  selectors: {
    getUser: (state) => state,
  },
});

export const authActions = authSlice.actions;

export const authSelectors = authSlice.selectors;

export default authSlice.reducer;
