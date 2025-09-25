import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQueryApi } from "../baseApi";
import { LoginPayload, LoginResponse, RegisterPayload, RegisterResponse, User } from "./authTypes";

export const authApi = createApi({
    baseQuery : baseQueryApi,
    tagTypes : ["User"],
    endpoints : (builder) =>({
        register : builder.mutation<RegisterResponse, RegisterPayload>({
            query : (payload : RegisterPayload) => ({
                url : "/auth/signup",
                method : "POST",
                body : payload,
            }),
            invalidatesTags : ["User"]
        }),
        login : builder.mutation<LoginResponse  , LoginPayload>({
            query : (payload: LoginPayload) => ({
                url : "/auth/signin",
                method : "POST",
                body : payload,
            }),
            invalidatesTags : ["User"]
        }),
        logout : builder.mutation({
            query : () => ({
                url : "/auth/signout",
                method : "POST",
            }),
            invalidatesTags : ["User"]
        })
    })
})

export const { useRegisterMutation, useLoginMutation, useLogoutMutation } = authApi;