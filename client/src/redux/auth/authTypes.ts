
export interface User {
    id : string;
    fullName : string;
    email : string;
    password : string;
}

export interface RegisterPayload {
    fullName : string;
    email : string;
    password : string;
}

export interface LoginPayload {
    email : string;
    password : string;
}

export interface LoginResponse {
    success : boolean;
    message : string;
    user : User;
    token : string;
}

export interface RegisterResponse {
    success : boolean;
    message : string;
    user : User;
    token : string;
}

export interface LogoutResponse {
    success : boolean;
}