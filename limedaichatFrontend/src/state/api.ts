import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//TODO: update payload config and body to match the server after setting up state management
export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BACKEND_BASE_URL }),
  reducerPath: "main",
  tagTypes: [],
  endpoints: (build) => ({
    postSignUp: build.mutation({
      query: (payload) => ({
        url: "/api/authentication/signup",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { usePostSignUpMutation } = api;
