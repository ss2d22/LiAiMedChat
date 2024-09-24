import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BACKEND_URL, FETCH_MESSAGES_ROUTE } from "@/constants";

/**
 * messages related endpoints for the apis from the backend to be used
 * in the frontend using react redux
 * @author Sriram Sundar
 *
 */
export const messagesApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BACKEND_URL,
    credentials: "include",
  }),
  reducerPath: "messages",
  tagTypes: [],
  endpoints: (build) => ({
    postFetchMessages: build.mutation({
      query: (payload) => ({
        url: FETCH_MESSAGES_ROUTE,
        method: "POST",
        body: payload as string,
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
export const { usePostFetchMessagesMutation } = messagesApi;
