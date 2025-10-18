import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  globalSearchValue: "",
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setGlobalSearchValue: (state, action) => {
      state.globalSearchValue = action.payload;
    },
    clearGlobalSearchValue: (state) => {
      state.globalSearchValue = "";
    },
  },
  selectors: {
    getGlobalSearchValue: (state) => state.globalSearchValue,
  },
});

export const searchSliceActions = searchSlice.actions;
export const searchSliceSelectors = searchSlice.selectors;

export default searchSlice.reducer;
