import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  BACKEND_URL,
  DELETE_AVATAR_ROUTE,
  UPDATE_AVATAR_ROUTE,
  UPDATE_PROFILE_ROUTE,
} from "@/constants";

/**
 * profile related endpoints for the apis from the backend to be used 
 * in the frontend using react redux
 * @author Sriram Sundar
 *
 */
export const profileApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BACKEND_URL,
    credentials: "include",
  }),
  reducerPath: "profile",
  tagTypes: [],
  endpoints: (build) => ({
    patchUpdateProfile: build.mutation({
      query: (payload) => ({
        url: UPDATE_PROFILE_ROUTE,
        method: "PATCH",
        body: payload as string,
      }),
    }),
    patchUpdateAvatar: build.mutation({
      query: (payload) => ({
        url: UPDATE_AVATAR_ROUTE,
        method: "PATCH",
        body: payload as string,
      }),
    }),
    deleteDeleteAvatar: build.mutation({
      query: (payload) => ({
        url: DELETE_AVATAR_ROUTE,
        method: "DELETE",
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
export const {
  usePatchUpdateProfileMutation,
  usePatchUpdateAvatarMutation,
  useDeleteDeleteAvatarMutation,
} = profileApi;
