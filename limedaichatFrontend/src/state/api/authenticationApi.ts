import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  BACKEND_URL,
  FETCH_USER_INFO_ROUTE,
  SIGN_OUT_ROUTE,
  SIGNIN_ROUTE,
  SIGNUP_ROUTE,
} from "@/constants";

//TODO: update payload config and body to match the server after setting up state management
/**
 * authentication related endpoints for the apis from the backend to be used
 * in the frontend using react redux
 * @author Sriram Sundar
 *
 */
export const authenticationApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BACKEND_URL,
    credentials: "include",
  }),
  reducerPath: "main",
  tagTypes: [],
  endpoints: (build) => ({
    postSignUp: build.mutation({
      query: (payload) => ({
        url: SIGNUP_ROUTE,
        method: "POST",
        body: payload as string,
      }),
    }),
    postSignIn: build.mutation({
      query: (payload) => ({
        url: SIGNIN_ROUTE,
        method: "POST",
        body: payload as string,
      }),
    }),
    getFetchUserInfo: build.query({
      query: () => ({
        url: FETCH_USER_INFO_ROUTE,
        method: "GET",
      }),
    }),
    postSignOut: build.mutation({
      query: () => ({
        url: SIGN_OUT_ROUTE,
        method: "POST",
      }),
    }),
  }),
});

/**
 * hooks to use the apis defined in this file using
 * react redux
 * @author Sriram Sundar
 *
 */
export const {
  usePostSignUpMutation,
  usePostSignInMutation,
  useGetFetchUserInfoQuery,
  usePostSignOutMutation,
} = authenticationApi;
