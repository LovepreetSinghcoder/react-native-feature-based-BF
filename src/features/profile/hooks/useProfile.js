// src/hooks/profile/useProfile.js

import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { updateProfile } from "../../../store/slices/profileSlice";


import { useAppSelector } from "../../../store/hooks";

/* -------------------------------------------------------------------------- */
/*                                USE PROFILE                                 */
/* -------------------------------------------------------------------------- */

export const useProfile = () => {
  const dispatch = useDispatch();

  const { status, error } = useSelector((state) => state.profile);
  const user = useAppSelector((state) => state.auth.user);

  /* ------------------------------ ACTIONS --------------------------------- */

  const handleUpdateProfile = useCallback(
    async (data) => {
      return dispatch(updateProfile(data));
    },
    [dispatch],
  );

  /* --------------------------- TEAM NAME ACTIONS -------------------------- */

  const getTeamNameHandler = useCallback(
    async (code) => {
      // return dispatch(fetchTeamName(code));
      return '';
    },
    [dispatch],
  );

  const createTeamNameHandler = useCallback(
    async (code, name) => {
      // return dispatch(createTeamNameThunk({ code, name })).unwrap();
      return '';

    },
    [dispatch],
  );

  const updateTeamNameHandler = useCallback(
    async (code, name) => {
      // return dispatch(updateTeamNameThunk({ code, name })).unwrap();
      return '';

    },
    [dispatch],
  );

  /* -------------------------------------------------------------------------- */

  return {
    // state
    user: user?.user ?? user ?? undefined,

    // semantic loading
    loading: status === "loading",

    status,
    error,

    // actions
    updateProfile: handleUpdateProfile,
    getTeamName: getTeamNameHandler,
    createTeamName: createTeamNameHandler,
    updateTeamName: updateTeamNameHandler,
  };
};
