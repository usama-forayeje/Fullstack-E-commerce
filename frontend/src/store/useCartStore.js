import { create } from "zustand";
import axios from "../lib/axios.config";
import { toast } from "react-hot-toast";

export const useCartStore = create((set, get) => ({
  cart: [],
  coupon: null,
  isCouponApplied: false,
  loading: false,
  subTotal: 0,
  total: 0,

  getMyCoupon: async () => {
    try {
      const response = await axios.get("/coupons");
      set({ coupon: response.data });
    } catch (error) {
      console.error("Error fetching coupon:", error);
    }
  },

  applyCoupon: async (code) => {
    try {
      const response = await axios.post("/coupons/validate", { code });
      set({ coupon: response.data, isCouponApplied: true });
      get().calculateTotal();
      toast.success("Coupon applied successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to apply coupon");
    }
  },

  removeCoupon: () => {
    set({ coupon: null, isCouponApplied: false });
    get().calculateTotal();
    toast.success("Coupon removed");
  },

  getCartItems: async () => {
    try {
      const res = await axios.get("/cart");
      set({ cart: res.data });
      get().calculateTotal();
    } catch (error) {
      set({ cart: [] });
      const message = error?.response?.data?.message || error?.message || "An error occurred";
      toast.error(message);
    }
  },

  clearCart: () => {
    set({ cart: [], coupon: null, isCouponApplied: false, total: 0, subTotal: 0 });
  },

  addToCart: async (product) => {
    set({ loading: true });
    try {
      await axios.post("/cart", { productId: product._id });
      toast.success("Product added to cart successfully!");

      const { cart } = get();
      const existingItem = cart.find((item) => item._id === product._id);
      const updatedCart = existingItem
        ? cart.map((item) =>
            item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
          )
        : [...cart, { ...product, quantity: 1 }];

      set({ cart: updatedCart, loading: false });
      get().calculateTotal();
    } catch (error) {
      set({ loading: false });
      const message = error?.response?.data?.message || error?.message || "Cart update failed";
      toast.error(message);
    }
  },

  removeFromCart: async (productId) => {
    try {
      await axios.delete(`/cart`, { data: { productId } });
      set((prevState) => ({
        cart: prevState.cart.filter((item) => item._id !== productId),
      }));
      get().calculateTotal();
      toast.success("Product removed from cart successfully!");
    } catch (error) {
      const message = error?.response?.data?.message || error?.message || "Cart update failed";
      toast.error(message);
    }
  },

  updateQuantity: async (productId, quantity) => {
    try {
      if (quantity === 0) {
        get().removeFromCart(productId);
        return;
      }
      await axios.put(`/cart/${productId}`, { quantity });
      set((prevState) => ({
        cart: prevState.cart.map((item) => (item._id === productId ? { ...item, quantity } : item)),
      }));
      get().calculateTotal();
    } catch (error) {
      const message = error?.response?.data?.message || error?.message || "Cart update failed";
      toast.error(message);
    }
  },

  calculateTotal: () => {
    const { cart, coupon } = get();
    const subTotal = cart.reduce((total, item) => {
      const price = parseFloat(item.price) || 0;
      const quantity = parseInt(item.quantity) || 0;
      return total + price * quantity;
    }, 0);

    let total = subTotal;

    if (coupon && typeof coupon.discountPercentage === "number") {
      const discount = subTotal * (coupon.discountPercentage / 100);
      total = subTotal - discount;
    }

    set({
      subTotal: parseFloat(subTotal.toFixed(2)),
      total: parseFloat(total.toFixed(2)),
    });
  },
}));

export default useCartStore;
