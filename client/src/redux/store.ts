import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import { authApi } from "./auth/authEndpoint";
import { userApi } from "./user/userEndpoint";

export const store = configureStore({
    reducer : {
        auth : authReducer,
        [authApi.reducerPath] : authApi.reducer,
        [userApi.reducerPath] : userApi.reducer,
    },

    middleware : (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(authApi.middleware)
    .concat(userApi.middleware),

    devTools: true
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch