import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "./authTypes";


interface AuthState {
    user : User;
    isAuthenticated : boolean;
    isLoading : boolean;
    isSuccess : boolean;
    isError : boolean;
    token : string | null;
}

const initialState : AuthState = {
    user : localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    isAuthenticated : localStorage.getItem("isAuthenticated") ? JSON.parse(localStorage.getItem("isAuthenticated")) : false,
    isLoading : false,
    isSuccess : false,
    isError : false,
    token : localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
} 

const authSlice = createSlice ({
    name : "auth",
    initialState,
    reducers : {
        setUser : (state, action : PayloadAction<AuthState['user']>) => {
            state.user = action.payload;
            localStorage.setItem("user", JSON.stringify(action.payload));
        },
        setIsAuthenticated : (state, action : PayloadAction<AuthState['isAuthenticated']>) => {
            state.isAuthenticated = action.payload;
            localStorage.setItem("isAuthenticated", JSON.stringify(action.payload));
        },
        setToken : (state, action: PayloadAction<AuthState['token']>) => {   
            state.token = action.payload;
            localStorage.setItem("token", JSON.stringify(action.payload));
        },
        setIsLoading : (state, action : PayloadAction<AuthState['isLoading']>) => {
            state.isLoading = action.payload;
        },
        setIsSuccess : (state, action : PayloadAction<AuthState['isSuccess']>) => {
            state.isSuccess = action.payload;
        },
        setIsError : (state, action : PayloadAction<AuthState['isError']>) => {
            state.isError = action.payload;
        }, 
    }
})

export const { setToken, setUser, setIsAuthenticated, setIsLoading, setIsSuccess, setIsError } = authSlice.actions;

export default authSlice.reducer;

