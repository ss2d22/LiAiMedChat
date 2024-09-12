import { configureStore, Store } from "@reduxjs/toolkit";
import { authenticationApi } from "@/state/api/authenticationApi.ts";
import authReducer from "@/state/slices/authSlice";

/**
 * store to be used in the frontend using react redux
 * @author Sriram Sundar
 *
 * @type {Store}
 */
export const store : Store = configureStore({
  reducer: {
    [authenticationApi.reducerPath]: authenticationApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authenticationApi.middleware),
});
