import { motion } from "framer-motion";
import { useCartStore } from "../store/useCartStore";
import { Link } from "react-router";
import { MoveRight } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "../lib/axios.config";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
function OrderSummary() {
  const { total, subTotal, coupon, isCouponApplied, cart } = useCartStore();



  const saving = subTotal - total;
  const formattedSubTotal = subTotal.toFixed(2);
  const formattedTotal = total.toFixed(2);
  const formattedSaving = saving.toFixed(2);

  const handlePayment = async () => {
    const stripe = await stripePromise;
    const response = await axios.post("/payments/create-checkout-session", {
      products: cart,
      couponCode: coupon ? coupon.code : null,
    });

    const session = response.data;

    const result = await stripe.redirectToCheckout({
      sessionId: session.id
    })
console.log("Checkout Session ID:", session.id);

    if (result.error) {
      console.log(result.error.message);
    }

  };

  return (
    <motion.div
      className="space-y-4 rounded-lg border border-gray-700 bg-gray-800 p-4 shadow-sm sm:p-6"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <p className="text-lg font-semibold text-emerald-400">Order Summary</p>
      <div className="space-y-4">
        <div className="space-y-2">
          <dl className="flex items-center justify-between gap-4">
            <dt className="text-base font-normal text-gray-400">Original Price</dt>
            <dd className="text-base font-medium text-gray-200">${formattedSubTotal}</dd>
          </dl>

          {saving > 0 && (
            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-gray-400">You Saved</dt>
              <dd className="text-base font-medium text-emerald-400">${formattedSaving}</dd>
            </dl>
          )}

          {coupon && isCouponApplied && (
            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-gray-400">Coupon({coupon.code})</dt>
              <dd className="text-base font-medium text-emerald-400">
                -{coupon.discountPercentage}
              </dd>
            </dl>
          )}

          <dl className="flex items-center justify-between gap-4">
            <dt className="text-base font-medium text-gray-200">Total</dt>
            <dd className="text-base font-semibold text-emerald-400">${formattedTotal}</dd>
          </dl>
        </div>

        <motion.button
          className="flex w-full items-center cursor-pointer  justify-center rounded-lg bg-emerald-600 px-5 py-2.5 
          text-sm text-white font-medium hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePayment}
        >
          Proceed to Checkout
        </motion.button>
        <div className="flex items-center justify-center gap-2">
          <span className="text-sm font-normal text-gray-400">or</span>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-emerald-400 underline hover:text-emerald-300 hover:no-underline"
          >
            Continue Shopping
            <MoveRight size={16} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default OrderSummary;
