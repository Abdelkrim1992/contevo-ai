import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQueryApi } from "../baseApi";
import { LoginPayload, LoginResponse, RegisterPayload, RegisterResponse, User } from "./authTypes";

export const authApi = createApi({
    reducerPath : 'authApi',
    baseQuery : baseQueryApi,
    tagTypes : ["Auth"],
    endpoints : (builder) =>({
        register : builder.mutation<RegisterResponse, RegisterPayload>({
            query : (payload : RegisterPayload) => ({
                url : "/auth/signup",
                method : "POST",
                body : payload,
            }),
            invalidatesTags : ["Auth"]
        }),
        login : builder.mutation<LoginResponse  , LoginPayload>({
            query : (payload: LoginPayload) => ({
                url : "/auth/signin",
                method : "POST",
                body : payload,
            }),
            invalidatesTags : ["Auth"]
        }),
        logout : builder.mutation({
            query : () => ({
                url : "/auth/signout",
                method : "POST",
            }),
            invalidatesTags : ["Auth"]
        })
    })
})

export const { useRegisterMutation, useLoginMutation, useLogoutMutation } = authApi;