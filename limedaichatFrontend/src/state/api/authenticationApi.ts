import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BACKEND_URL, SIGNIN_ROUTE, SIGNUP_ROUTE } from "@/constants";

//TODO: update payload config and body to match the server after setting up state management
/**
 * endpoints of apis from the backend to be used in the frontend using react redux
 * @author Sriram Sundar
 *
 * @type {*}
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
  }),
});

/**
 * hook to use the postSignUp mutation from react redux
 * @author Sriram Sundar
 *
 * @type {*}
 */
export const { usePostSignUpMutation, usePostSignInMutation } = authenticationApi;
