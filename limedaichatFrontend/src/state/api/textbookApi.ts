import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  BACKEND_URL,
  GET_TEXTBOOKS_FOR_LIST_ROUTE,
  SEARCH_TEXTBOOKS_ROUTE,
} from "@/constants";

/**
 * textbook related endpoints for the apis from the backend to be used
 * in the frontend using react redux
 * @author Sriram Sundar
 *
 */
export const textbooksApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BACKEND_URL,
    credentials: "include",
  }),
  reducerPath: "textbook",
  tagTypes: [],
  endpoints: (build) => ({
    postSearchTextbooks: build.mutation({
      query: (payload) => ({
        url: SEARCH_TEXTBOOKS_ROUTE,
        method: "POST",
        body: payload as string,
      }),
    }),
    getGetTextbooksForList: build.query({
      query: () => ({
        url: GET_TEXTBOOKS_FOR_LIST_ROUTE,
        method: "GET",
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
  usePostSearchTextbooksMutation,
  useGetGetTextbooksForListQuery,
  useLazyGetGetTextbooksForListQuery,
} = textbooksApi;
