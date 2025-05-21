import { create } from "zustand";
import axios from "../lib/axios.config.js";
import { toast } from "react-hot-toast";

export const useUserStore = create((set) => ({
  user: null,
  loading: false,
  checkingAuth: false,

  signUp: async (formData) => {
    set({ loading: true });

    try {
      const res = await axios.post("/auth/sign-up", formData);
      set({ user: res.data.user, loading: false });
      toast.success("Account created successfully!");
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.message || "Something went wrong");
      throw error;
    }
  },

  logIn: async (formData) => {
    set({ loading: true });

    try {
      const res = await axios.post("/auth/log-in", formData);
      set({ user: res.data.user, loading: false });
      toast.success("Logged in successfully!");
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || "Something went wrong");
      throw error;
    }
  },

  logOut: async () => {
    try {
      await axios.post("/auth/log-out");
      set({ user: null });
      toast.success("Logged out successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      throw error;
    }
  },

  checkAuth: async () => {
    set({ checkingAuth: true });
    try {
      const res = await axios.get("/auth/profile");
      set({ user: res.data, checkingAuth: false });
    } catch (error) {
      set({ checkingAuth: false, user: null });
      toast.error(error.response?.data?.message || "Something went wrong");
      throw error;
    }
  },
}));
