import { useLoginMutation, useRegisterMutation } from "@/redux/auth/authEndpoints"
import { setIsAuthenticated, setToken, setUser } from "@/redux/auth/authSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LoginPayload, RegisterPayload, User } from "@/redux/auth/authTypes";

const useAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [login , loginStatus] = useLoginMutation();
    const [register, registerStatus] = useRegisterMutation();

    const handleAuthSuccess = ( user: User, token: string) => {
        dispatch(setUser(user))
        dispatch(setToken(token))
        dispatch(setIsAuthenticated(true))
        navigate("/dashboard/home");
    }
    
    const signUp = async ({fullName, email, password} : RegisterPayload) => {
        try {
            const response = await register({fullName, email, password}).unwrap()
            const { user, success, message, token} = response;

            if(success){
                handleAuthSuccess(user, token)
            } else {
                console.error('Failed to register user', message)
            }
        } catch (error) {
            console.error('Registration error:', error);
        }
    }

    const signIn = async ({email, password} : LoginPayload) => {
        try {
            const response = await login({email, password}).unwrap()
            const { user, success, message, token} = response;

            if(success){
                handleAuthSuccess(user, token)
            } else {
                console.error('Error logging in', message)
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    }

    const signOut = () => {
        dispatch(setUser(null));
        dispatch(setToken(null));
        dispatch(setIsAuthenticated(false));
        
        // Clear localStorage
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("isAuthenticated");
        
        navigate("/auth/sign-in", { replace: true });
    }

    return { 
        signUp,
        signIn,
        signOut,
        loginStatus,
        registerStatus,
    }
}

export default useAuth;