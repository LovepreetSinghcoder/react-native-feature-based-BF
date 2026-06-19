import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const checkFirstLaunch = createAsyncThunk(
  "app/checkFirstLaunch",
  async () => {
    const value = await AsyncStorage.getItem("alreadyLaunched");

    if (value === null) {
      await AsyncStorage.setItem("alreadyLaunched", "true");
      return true;
    }

    return false;
  },
);

const appSlice = createSlice({
  name: "app",
  initialState: {
    isFirstLaunch: null,
    checkedFirstLaunch: false,
  },
  reducers: {
    setIsFirstLaunch: (state, action) => {
      state.isFirstLaunch = action.payload;
      state.checkedFirstLaunch = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(checkFirstLaunch.fulfilled, (state, action) => {
      state.isFirstLaunch = action.payload;
      state.checkedFirstLaunch = true;
    });
  },
});

export const { setIsFirstLaunch } = appSlice.actions;
export default appSlice.reducer;
