import { LayoutDashboard, LogInIcon, LogOut, ShoppingCart, UserPlus } from "lucide-react";
import { Link } from "react-router";
import { Button } from "./ui/button";

function NavBer() {
  const user = false;
  const admin = false;
  return (
    <header className="fixed top-0 left-0 w-full bg-gray-900 bg-opacity-90 backdrop-blur-md shadow-lg z-40 transition-all duration-300 border-b border-emerald-800">
      <div className="container  mx-auto px-4 py-3 ">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-emerald-400 items-center space-x-2 flex">
            E-Commerce
          </Link>
          <nav className="flex flex-wrap items-center gap-4">
            <Link
              to={"/"}
              className="text-gray-300 hover:text-emerald-400 transition duration-300 ease-in-out"
            >
              Home
            </Link>
            {user && (
              <Link
                to="/cart"
                className="relative group text-gray-300 hover:text-emerald-400 transition duration-300 ease-in-out"
              >
                <ShoppingCart
                  size={20}
                  className=" inline-block mr-1 group-hover:text-emerald-400 "
                />
                <span className="hidden sm:inline">Cart</span>
                <span className="absolute -top-2 -left-2 bg-emerald-500 text-white rounded-full px-2 py-0.5 text-xs group-hover:bg-emerald-400 transition duration-300 ease-in-out">
                  3
                </span>
              </Link>
            )}
            {admin && (
              <Link
                to="/dashboard"
                className="bg-emerald-700 hover:bg-emerald-600 py-2 px-4  text-white  rounded-md font-medium transition duration-300 ease-in-out flex items-center"
              >
                <LayoutDashboard
                  size={18}
                  className=" inline-block mr-1 group-hover:text-emerald-400 "
                />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
            )}
            {user ? (
              <Button className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md items-center flex transition duration-300 ease-in-out">
                <LogOut size={18} />
                <span className="hidden sm:inline">Log Out</span>
              </Button>
            ) : (
              <>
                <Link
                  to={"/sign-up"}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out"
                >
                  <UserPlus className="mr-2 " size={18} />
                  <span className="hidden sm:inline ml-2">Sign Up</span>
                </Link>
                <Link
                  to={"/log-in"}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out"
                >
                  <LogInIcon className="mr-2 " size={18} />
                  <span className="hidden sm:inline ml-2">Log In</span>
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}

export default NavBer;
