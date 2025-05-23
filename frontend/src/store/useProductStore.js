import { create } from "zustand";
import axios from "../lib/axios.config.js";
import { toast } from "react-hot-toast";

export const useProductStore = create((set) => ({
  products: [],
  loading: false,

  setProducts: (products) => set({ products }),

  createProducts: async (formData) => {
    set({ loading: true });
    try {
      const res = await axios.post("/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      set((prevState) => ({
        products: [...prevState.products, res.data],
        loading: false,
      }));
      toast.success("Product created successfully!");
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || "Something went wrong");
      throw error;
    }
  },
}));
