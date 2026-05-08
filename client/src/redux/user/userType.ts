
export interface UserInfo {
    id : string;
    fullName : string;
    email : string;
    imageUrl : string;
    phoneNumber : string;
    address : string;
    city : string;
    country : string;
}

export interface UpdateUserProfilePayload {
    fullName : string;
    email : string;
    imageUrl : string;
    phoneNumber : string;
    address : string;
    city : string;
    country : string;
}

export interface UpdateUserProfileResponse {
    success : boolean;
    message : string;
    user : UserInfo;
}

export interface DeleteUserProfileResponse {
    success : boolean;
    message : string;
}