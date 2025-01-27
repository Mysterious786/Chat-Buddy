import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
export const useAuthStore = create((set) => ({
    authUser: null // dont knw whether user is authenticated or not
    , isCheckingAuth: true ,// to check whether user is authenticated or not
    isSigningUp: false, // to check whether user is signing up or not
    isLoggingIn: false, // to check whether user is logging in or not
     // to check whether user is logging out or not
    isUpdatingProfile: false, // to check whether user is updating profile or not
    checkAuth: async() =>
    {
        try{
            const res = await axiosInstance.get("/auth/check");
            set({authUser: res.data})
        }catch(error)
        {
            set({authUser: null});
            console.error(error);
        }finally{
            set({isCheckingAuth: false});
        }
    }
}))