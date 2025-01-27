import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set, get) => ({
  authUser: null, // Current authenticated user
  isCheckingAuth: true, // Checking authentication state
  isSigningUp: false, // Signing up state
  isLoggingIn: false, // Logging in state
  isUpdatingProfile: false, // Updating profile state

  // Check if the user is authenticated
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      set({ authUser: null });
      console.error("Error during auth check:", error.message);
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  // Handle user signup
  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully");
      // Optional: Call any additional functions after signup
      // get().connectSocket(); 
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Signup failed";
      toast.error(errorMessage);
      console.error("Signup error:", error.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  // Handle user login
  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully");
      // Optional: Call any additional functions after login
      // get().connectSocket(); 
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Login failed";
      toast.error(errorMessage);
      console.error("Login error:", error.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  // Handle user logout
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
      // Optional: Call any additional functions after logout
      // get().disconnectSocket(); 
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Logout failed";
      toast.error(errorMessage);
      console.error("Logout error:", error.message);
    }
  },
  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("error in update profile:", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

}));
