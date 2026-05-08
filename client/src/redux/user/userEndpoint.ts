import { User } from "../auth/authTypes";
import { baseQueryApi } from "../baseApi";
import { createApi } from "@reduxjs/toolkit/query/react";
import { UpdateUserProfileResponse, UpdateUserProfilePayload, UserInfo, DeleteUserProfileResponse } from "./userType";


export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery : baseQueryApi,
    tagTypes : ["User"],
    endpoints : (builder) => ({
        getUserProfile : builder.query<UserInfo, void>({
            query : () => "/user/profile",
            providesTags : ["User"]
        }),
        updateUserProfile : builder.mutation<UpdateUserProfileResponse, UpdateUserProfilePayload>({
            query:(payload) => ({
                url : "/user/profile",
                method : 'PUT',
                body : payload,
            }),
            invalidatesTags : ["User"]
        }),
        deleteUserProfile : builder.mutation<UserInfo, DeleteUserProfileResponse>({
            query : () => ({
                url : "/user/profile",
                method: "DELETE"
            })
        })
    })
});

export const { useGetUserProfileQuery, useUpdateUserProfileMutation, useDeleteUserProfileMutation } = userApi;