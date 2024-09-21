import { configureStore, Store } from "@reduxjs/toolkit";
import { authenticationApi } from "@/state/api/authenticationApi.ts";
import authReducer from "@/state/slices/authSlice";
import { profileApi } from "@/state/api/profileApi";
import { textbooksApi } from "@/state/api/textbookApi";
/**
 * store to be used in the frontend using react redux
 * @author Sriram Sundar
 *
 * @type {Store}
 */
export const store: Store = configureStore({
  reducer: {
    [authenticationApi.reducerPath]: authenticationApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [textbooksApi.reducerPath]: textbooksApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authenticationApi.middleware)
      .concat(profileApi.middleware)
      .concat(textbooksApi.middleware),
});
