import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  BACKEND_URL,
  UPDATE_AVATAR_ROUTE,
  UPDATE_PROFILE_ROUTE,
} from "@/constants";

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
  }),
});

export const { usePatchUpdateProfileMutation, usePatchUpdateAvatarMutation } =
  profileApi;
