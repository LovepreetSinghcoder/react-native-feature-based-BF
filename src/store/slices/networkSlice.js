import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOffline: false,
};

const networkSlice = createSlice({
  name: "network",
  initialState,
  reducers: {
    setOffline: (state, action) => {
      state.isOffline = action.payload;
    },
  },
});

export const { setOffline } = networkSlice.actions;
export default networkSlice.reducer;
