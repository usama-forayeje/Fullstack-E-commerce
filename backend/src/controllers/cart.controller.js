import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getCartProducts = async (req, res) => {
  try {
    // collect all product IDs from user's cart
    const productIds = req.user.cartItems.map((item) => item.product);

    // fetch products from DB
    const products = await Product.find({ _id: { $in: productIds } });

    // attach quantity from cartItems
    const cartItems = products.map((product) => {
      const item = req.user.cartItems.find((cartItem) =>
        cartItem.product.toString() === product._id.toString()
      );
      return {
        ...product.toJSON(),
        quantity: item?.quantity || 1,
      };
    });

    res.json(cartItems);
  } catch (error) {
    console.log("Error in getCartProducts controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.user;

    const productExists = await Product.findById(productId);
    if (!productExists) {
      return res.status(404).json({
        success: false,
        error: "Product not found",
      });
    }

    const existingItemIndex = user.cartItems.findIndex(
      (item) => item.product.toString() === productId
    );

    if (existingItemIndex !== -1) {
      user.cartItems[existingItemIndex].quantity += 1;
    } else {
      user.cartItems.push({
        product: productId,
        quantity: 1,
      });
    }

    await user.save();

    res.status(200).json({
      success: true,
      data: { cartItems: user.cartItems },
      message: "Product added to cart successfully!",
    });
  } catch (error) {
    console.error("Add to cart error:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};
export const updateQuantity = async (req, res) => {
  try {
    const { id: productId } = req.params;
    const { quantity } = req.body;
    const user = req.user;

    const existingItem = user.cartItems.find((item) => item.product.equals(productId));

    if (!existingItem) {
      return res.status(404).json({
        success: false,
        error: "Product not found in cart",
      });
    }

    if (quantity <= 0) {
      user.cartItems = user.cartItems.filter((item) => !item.product.equals(productId));
    } else {
      existingItem.quantity = quantity;
    }
    await user.save();
    return res.status(200).json({ cartItems: user.cartItems });
  } catch (error) {
    console.log("add to cart error", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const removeAllFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.user;

    if (productId) {
      if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({
          success: false,
          error: "Invalid product ID",
        });
      }
      user.cartItems = user.cartItems.filter((item) => !item.product.equals(productId));
    } else {
      user.cartItems = [];
    }

    await user.save();

    res.status(200).json({ message: "Product removed from cart", cartItems: user.cartItems });
  } catch (error) {
    console.log("add to cart error", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
