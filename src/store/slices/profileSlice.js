import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { profileService } from "../../lib/services/profile.service";
import { updateUser } from "./authSlice";

/* ---------------------- THUNK ---------------------- */
export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const res = await profileService.updateProfile(data);

      // 🔥 sync with auth slice
      dispatch({
        type: "auth/updateUser",
        payload: res,
      });

      return res;
    } catch (err) {
      return rejectWithValue(err?.message || "Failed to update profile");
    }
  },
);

const initialState = {
  status: "idle",
  error: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    clearProfileError: (state) => {
      state.error = null;
    },

    resetProfileState: () => initialState,
  },

  extraReducers: (builder) => {
    builder
      .addCase(updateProfile.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(updateProfile.fulfilled, (state) => {
        state.status = "succeeded";
      })

      .addCase(updateProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearProfileError, resetProfileState } = profileSlice.actions;

export default profileSlice.reducer;
