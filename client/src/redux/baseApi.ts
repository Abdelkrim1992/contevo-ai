
import { ENV } from "@/env/env"
import { RootState } from "./store"
import { fetchBaseQuery } from "@reduxjs/toolkit/query"


export const baseQueryApi = fetchBaseQuery({
    baseUrl : ENV.VITE_BACKEND_EXPRESS_API_URL,
    credentials: "include",
    prepareHeaders : (headers, { getState }) => {
        const token = ( getState() as RootState).auth.token
        if(token) {
            headers.set("Authorization", `Bearer ${token}`)
        }
        headers.set("Content-Type", "application/json")
        return headers;
    }
})