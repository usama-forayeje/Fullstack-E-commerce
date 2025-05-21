import { create } from "zustand";
import axios from "../lib/axios.config.js";
import { toast } from "react-hot-toast";

export const useUserStore = create((get, set) => ({
  user: null,
  loading: false,
  checkingAuth: false,

  signUp: async () => {},

  logIn: async () => {},

  logOut: async () => {},

  checkAuth: async () => {},

  getUser: async () => {},

  updateUser: async () => {},

  deleteUser: async () => {},
}));
