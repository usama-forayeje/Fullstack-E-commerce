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
      throw error;
    }
  },

  refreshToken: async () => {
    const { checkingAuth } = useUserStore.getState();
    if (checkingAuth) return;
    set({ checkingAuth: true });

    try {
      const response = await axios.post("/auth/refresh-token");
      set({ checkingAuth: false });
      return response;
    } catch (error) {
      set({ checkingAuth: false, user: null });
      throw error;
    }
  },
}));

let refreshPromise = null;
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        if (!refreshPromise) {
          refreshPromise = useUserStore.getState().refreshToken();
        }

        await refreshPromise;
        refreshPromise = null;

        return axios(originalRequest);
      } catch (refreshError) {
        refreshPromise = null;
        useUserStore.getState().logOut();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
