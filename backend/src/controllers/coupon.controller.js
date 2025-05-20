import Coupon from "../models/coupon.model.js";

export const getCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findOne({ userId: req.user._id, isActive: true });

    res.status(200).json(coupon || {});
  } catch (error) {
    console.log("get coupon error", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const validateCoupon = async (req, res) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({ message: "Coupon code is required" });
    }

    const coupon = await Coupon.findOne({ code: code, userId: req.user._id, isActive: true });

    if (!coupon) {
      return res.status(400).json({ message: "Invalid coupon code" });
    }

    if (coupon.expirationDate < Date.now()) {
      coupon.isActive = false;
      await coupon.save();
      return res.status(400).json({ message: "Coupon code has expired" });
    }

    res
      .status(200)
      .json({
        message: "Coupon code is valid",
        discountPercentage: coupon.discountPercentage,
        code: coupon.code,
      });
  } catch (error) {
    console.log("validate coupon error", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

