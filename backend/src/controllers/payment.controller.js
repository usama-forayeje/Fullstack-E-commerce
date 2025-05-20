import { stripe } from "../../db/stripe.js";
import Coupon from "../models/coupon.model.js";
import Order from "../models/order.model.js";

export const createCheckoutSession = async (req, res) => {
  try {
    const { products, couponCode } = req.body;

    if (!Array.isArray(products) || products.length < 1) {
      return res.status(400).json({ message: "invalid or empty products array" });
    }

    let totalAmount = 0;
    const lineItems = products.map((product) => {
      const amount = Math.round(product.price * 100);
      totalAmount += amount * product.quantity;

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            images: [product.image],
          },
          unit_amount: amount,
        },
        quantity: product.quantity,
      };
    });

    let coupon = null;
    if (couponCode) {
      coupon = await Coupon.findOne({ code: couponCode, userId: req.user._id, isActive: true });

      if (coupon) {
        totalAmount -= Math.round(totalAmount * (coupon.discountPercentage / 100));
      }
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/purchase-cancel`,
      discounts: coupon ? [{ coupon: await crateStripeCoupon(coupon.discountPercentage) }] : [],
      metadata: {
        userId: req.user._id,
        couponCode: coupon ? coupon.code : null,
        products: JSON.stringify(
          products.map((p) => ({ _id: p._id, quantity: p.quantity, price: p.price }))
        ),
      },
    });

    if (totalAmount >= 200) {
      await crateNewCoupon({ id: session.id, totalAmount: totalAmount / 100 });
    }

    res.status(200).json({ url: session.url });
  } catch (error) {}
};

export const checkoutSuccess = async (req, res) => {
  try {
    const { sessionId } = req.query;
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status === "paid") {
      if (session.metadata.couponCode) {
        await Coupon.findOneAndUpdate(
          { code: session.metadata.couponCode, userId: session.metadata.userId },
          { isActive: false }
        );
      }
      const products = JSON.parse(session.metadata.products);
      const newOrder = new Order({
        userId: session.metadata.userId,
        products: products.map((p) => ({ _id: p._id, quantity: p.quantity, price: p.price })),
        totalAmount: session.amount_total / 100,
        stripeSessionId: sessionId,
      });
      await newOrder.save();
    }
    res
      .status(200)
      .json({
        success: true,
        massage: "payment successful , order created, and coupon deactivated of used.",
        orderId: newOrder._id,
      });
  } catch (error) {
    console.log("checkout success error", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

async function crateNewCoupon(userId) {
  const newCoupon = new Coupon({
    code: "GIFT" + Math.random().toString(36).substring(2, 8).toUpperCase(),
    discountPercentage: 10,
    expirationDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    isActive: true,
    userId: userId,
  });

  await newCoupon.save();
  return newCoupon;
}

async function crateStripeCoupon(discountPercentage) {
  const coupon = await stripe.coupons.create({
    percent_off: discountPercentage,
    duration: "once",
  });
  return coupon.id;
}
