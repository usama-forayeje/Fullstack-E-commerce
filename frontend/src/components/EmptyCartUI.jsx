/* eslint-disable no-unused-vars */
import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Link } from "react-router";

const EmptyCartUI = () => (
  <motion.div
    className="flex flex-col items-center justify-center space-y-4 py-20 text-center"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
  >
    <ShoppingCart className="h-24 w-24 text-gray-400" />
    <h3 className="text-2xl font-semibold text-gray-100">Your cart is empty</h3>
    <p className="text-gray-400 max-w-sm">
      Looks like you haven’t added anything to your cart yet.
    </p>

    <Button asChild className="mt-6 bg-emerald-500 hover:bg-emerald-600 transform duration-300">
      <Link to="/" className="font-medium">
        Start Shopping
      </Link>
    </Button>
  </motion.div>
);

export default EmptyCartUI;
