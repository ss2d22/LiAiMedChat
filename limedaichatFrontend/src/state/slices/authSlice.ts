import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, UserInformation } from "@/types";

/**
 * Declaration of initial state for auth slice in the store
 * @author Sriram Sundar
 *
 * @type {AuthState}
 */
const initialState: AuthState = {
  userInfo: undefined,
};

/**
 * AuthSlice for the store to manage user information state in the frontend using react redux toolkit
 * @author Sriram Sundar
 *
 * @type {*}
 */
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserInfo: (
      state,
      action: PayloadAction<UserInformation | undefined>
    ) => {
      state.userInfo = action.payload;
    },
    clearUserInfo: (state) => {
      state.userInfo = undefined;
    },
  },
});

/**
 * export actions for auth slice in the store to manage user information state in the frontend using react redux toolkit
 * @author Sriram Sundar
 *
 * @type {*}
 */
export const { setUserInfo, clearUserInfo } = authSlice.actions;

export default authSlice.reducer;
