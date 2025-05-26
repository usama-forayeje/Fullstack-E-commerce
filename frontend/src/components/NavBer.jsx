import { LayoutDashboard, LogInIcon, LogOut, Menu, ShoppingCart, UserPlus } from "lucide-react";
import { Link } from "react-router";
import { useUserStore } from "../store/useUserStore";
import { useCartStore } from "../store/useCartStore";

function NavBer() {
  const user = useUserStore((state) => state.user);
  const cart = useCartStore((state) => state.cart);
  const { logOut } = useUserStore();
  const admin = user?.role === "admin";

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-900 bg-opacity-90 backdrop-blur-md shadow-lg z-40 transition-all duration-300 border-b border-emerald-800">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-emerald-400">E-Commerce</span>
          </Link>

          {/* Navigation Links - Desktop */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link
              to="/"
              className="text-gray-300 hover:text-emerald-400 transition duration-300 px-3 py-2"
            >
              Home
            </Link>

            {user && (
              <Link
                to="/cart"
                className="relative group text-gray-300 hover:text-emerald-400 transition duration-300 px-3 py-2"
              >
                <div className="flex items-center">
                  <ShoppingCart size={20} className="mr-1" />
                  <span className="hidden sm:inline">Cart</span>
                  {cart?.length > 0 && (
                    <span className="absolute -top-2 -right-1 bg-emerald-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                      {cart.length}
                    </span>
                  )}
                </div>
              </Link>
            )}

            {admin && (
              <Link
                to="/secret-dashboard"
                className="bg-emerald-700 hover:bg-emerald-600 text-white px-4 py-2 rounded-md font-medium transition duration-300 flex items-center"
              >
                <LayoutDashboard size={18} className="mr-2" />
                <span>Dashboard</span>
              </Link>
            )}

            {user ? (
              <button
                onClick={logOut}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center transition duration-300"
              >
                <LogOut size={18} className="mr-2" />
                <span className="hidden sm:inline">Log Out</span>
              </button>
            ) : (
              <>
                <Link
                  to="/sign-up"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md flex items-center transition duration-300"
                >
                  <UserPlus size={18} className="mr-2" />
                  <span className="hidden sm:inline">Sign Up</span>
                </Link>
                <Link
                  to="/log-in"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md flex items-center transition duration-300"
                >
                  <LogInIcon size={18} className="mr-2" />
                  <span className="hidden sm:inline">Log In</span>
                </Link>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-300 hover:text-emerald-400 focus:outline-none">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </header>
  );
}

export default NavBer;
