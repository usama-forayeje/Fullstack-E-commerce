import { Navigate, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LogInPage from "./pages/LogInPage";
import NavBer from "./components/NavBer";
import { useUserStore } from "./store/useUserStore.js";
import { useEffect } from "react";
import LoadingSpinner from "./components/LoadingSpinner.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import { useCartStore } from "./store/useCartStore.js";
import PurchaseSuccessPage from "./pages/PurchaseSuccessPage.jsx";
import PurchaseCancelPage from "./pages/PurchaseCancelPage.jsx";

function App() {
  const user = useUserStore((state) => state.user);
  const checkAuth = useUserStore((state) => state.checkAuth);
  const checkingAuth = useUserStore((state) => state.checkingAuth);
  const getCartItems = useCartStore((state) => state.getCartItems);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (user) {
      getCartItems();
    }
  }, [user, getCartItems]);

  if (checkingAuth) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden ">
      {/* background gradient */}
      <div className="absolute  inset-0 overflow-hidden">
        <div
          className="absolute backdrop-blur-sm top-0 left-1/2 -translate-x-1/2 h-full w-full 
    bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.3)_0%,rgba(10,80,60,0.2)_45%,rgba(0,0,0,1)_100%)]"
        />
      </div>

      <div className="relative z-50 pt-20">
        <NavBer />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sign-up" element={!user ? <SignUpPage /> : <Navigate to="/" />} />
          <Route path="/log-in" element={!user ? <LogInPage /> : <Navigate to="/" />} />
          <Route
            path="/secret-dashboard"
            element={user?.role === "admin" ? <AdminPage /> : <Navigate to="/log-in" />}
          />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/cart" element={user ? <CartPage /> : <Navigate to="/log-in" />} />
          <Route
            path="/purchase-success"
            element={<PurchaseSuccessPage />}
          />
          <Route
            path="/purchase-cancel"
            element={<PurchaseCancelPage />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
