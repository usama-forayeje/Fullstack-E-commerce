import Product from "../models/product.model.js";

export const getCartProducts = async (req, res) => {
  try {
    const products = await Product.find({ _id: { $in: req.user.cartItems } });

    const cartItems = products.map((product) => {
      const item = req.user.cartItems.find((cartItem) => cartItem.id == product.id);
      return {
        ...product._doc,
        quantity: item.quantity,
      };
    });

    res.status(200).json({ cartItems });
  } catch (error) {
    console.log("get cart error", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.user;

    const existingItem = user.cartItems.find((item) => item.id == productId);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      user.cartItems.push({ id: productId, quantity: 1 });
    }
    await user.save();

    res.status(200).json({ message: "Product added to cart", cartItems: user.cartItems });
  } catch (error) {
    console.log("add to cart error", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateQuantity = async (req, res) => {
  try {
    const { id: productId } = req.params;
    const { quantity } = req.body;
    const user = req.user;

    const existingItem = user.cartItems.find((item) => item.id == productId);
    if (existingItem) {
      if (quantity === 0) {
        user.cartItems = user.cartItems.filter((item) => item.id !== productId);
        await user.save();
        return res.status(200).json({ cartItems: user.cartItems });
      }
      existingItem.quantity = quantity;
      await user.save();
      return res.status(200).json({ cartItems: user.cartItems });
    } else {
      return res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (error) {
    console.log("add to cart error", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const removeAllFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.user;

    if (!productId) {
      user.cartItems = [];
    } else {
      user.cartItems = user.cartItems.filter((item) => item.id !== productId);
    }

    await user.save();

    res.status(200).json({ message: "Product removed from cart", cartItems: user.cartItems });
  } catch (error) {
    console.log("add to cart error", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
