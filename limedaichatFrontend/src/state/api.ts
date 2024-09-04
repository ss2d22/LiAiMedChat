import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BACKEND_URL, SIGNUP_ROUTE } from "@/utils/constants";

//TODO: update payload config and body to match the server after setting up state management
/**
 * endpoints of apis from the backend to be used in the frontend using react redux
 * @author Sriram Sundar
 *
 * @type {*}
 */
export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: BACKEND_URL }),
  reducerPath: "main",
  tagTypes: [],
  endpoints: (build) => ({
    postSignUp: build.mutation({
      query: (payload) => ({
        url: SIGNUP_ROUTE,
        method: "POST",
        body: payload,
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
export const { usePostSignUpMutation } = api;
