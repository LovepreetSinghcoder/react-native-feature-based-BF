import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isMaintenance: false,
  isUserBanned: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setMaintenance: (state, action) => {
      state.isMaintenance = action.payload;
    },

    setUserBanned: (state, action) => {
      state.isUserBanned = action.payload;
    },
  },
});

export const { setMaintenance, setUserBanned } = uiSlice.actions;
export default uiSlice.reducer;
