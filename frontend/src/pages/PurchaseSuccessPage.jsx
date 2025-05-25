import { ArrowRight, CheckCircle, HandHeart } from "lucide-react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { useCartStore } from "../store/useCartStore";
import { useEffect, useState } from "react";
import axios from "../lib/axios.config";



function PurchaseSuccessPage() {
    const [isProcessing, setIsProcessing] = useState(true);
    const [error, setError] = useState(null);
    const { clearCart } = useCartStore();

    useEffect(() => {
        let called = false;
        const handleCheckoutSuccess = async (sessionId) => {
            if (called) return;
            called = true;
            try {
                await axios.post('/payments/checkout-success', {
                    sessionId
                });
                clearCart();
            } catch (error) {
                console.log(error);
                setError('Something went wrong while confirming the order.');
            } finally {
                setIsProcessing(false);
            }
        };
        const sessionId = new URLSearchParams(window.location.search).get('session_id');
        if (sessionId) {
            handleCheckoutSuccess(sessionId);
        } else {
            setIsProcessing(false);
            setError('No session id found');
        }
    }, [clearCart]);

    if (isProcessing) {
        return (
            <div className="h-screen flex items-center justify-center">
                <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-xl overflow-hidden relative z-10">
                    <div className="p-6 sm:p-8">
                        <HandHeart className="h-16 w-16 text-emerald-400 mb-4" />
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-center text-emerald-400 mb-2">
                        Processing your order
                    </h1>
                    <p className="text-gray-300 text-center mb-2">
                        Please wait, we're processing your order.
                    </p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="h-screen flex items-center justify-center">
                <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-xl overflow-hidden relative z-10">
                    <div className="p-6 sm:p-8">
                        <HandHeart className="h-16 w-16 text-emerald-400 mb-4" />
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-center text-emerald-400 mb-2">
                        Something went wrong
                    </h1>
                    <p className="text-gray-300 text-center mb-2">
                        {error}
                    </p>
                </div>
            </div>
        );
    }


    return (
        <div className="h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative backdrop-blur-md border border-emerald-500/20 bg-gray-800/70 shadow-2xl rounded-2xl w-full max-w-md p-6 sm:p-8"
            >
                <div className="flex justify-center">
                    <CheckCircle className="h-16 w-16 text-emerald-400 drop-shadow-lg animate-pulse" />
                </div>

                <h1 className="text-3xl sm:text-4xl font-bold text-center text-emerald-300 mt-4 mb-2">
                    Purchase Successful
                </h1>
                <p className="text-gray-300 text-center mb-2">
                    Thank you for your order. We’re processing it now.
                </p>
                <p className="text-emerald-400 text-center text-sm mb-6">
                    Check your email for order details and updates.
                </p>

                <div className="bg-gray-700/60 border border-emerald-500/10 backdrop-blur-md rounded-lg p-4 mb-6">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-400">Order number</span>
                        <span className="text-sm font-semibold text-emerald-400">#12345</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Estimated delivery</span>
                        <span className="text-sm font-semibold text-emerald-400">3-5 business days</span>
                    </div>
                </div>

                <div className="space-y-4">
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center transition-all duration-300 shadow-md">
                        <HandHeart className="mr-2" size={18} />
                        Thanks for trusting us!
                    </Button>
                    <Link
                        to="/"
                        className="w-full bg-gray-700 hover:bg-gray-600 text-emerald-400 font-bold py-2 px-4 rounded-lg flex items-center justify-center transition-all duration-300 shadow-md"
                    >
                        Continue Shopping
                        <ArrowRight className="ml-2" size={18} />
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}

export default PurchaseSuccessPage;
