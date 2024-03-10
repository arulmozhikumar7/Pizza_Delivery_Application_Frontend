import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import Cart from "./Cart";
import { resetLocalStorage } from "../storage/localStorage";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const userId = useSelector((state) => state.user.userId);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const cartItems = useSelector((state) => state.cart.items);
  console.log("Cart Items:", cartItems.length);

  const [openCart, setOpenCart] = useState(false);
  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "https://pizza-delivery-application-backend.onrender.com/api/auth/logout",
        {
          userId: userId,
        }
      );
      if (response.status === 200) {
        resetLocalStorage();
        navigate("/Auth");
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="text-gray-600 body-font">
      <div className="container flex flex-col flex-wrap items-center p-5 mx-auto md:flex-row">
        <Link
          to="/"
          className="flex items-center mb-4 font-medium text-gray-900 title-font md:mb-0"
        >
          <img src="/pizza.png" className="w-10 h-10 p-2 text-white" />
        </Link>
        <span className="ml-3 text-xl font-bold">Arul's Pizza Hub</span>
        <nav className="flex flex-wrap items-center justify-center text-base md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400"></nav>
        {isAuthenticated ? (
          <>
            <button
              className="inline-flex items-center px-3 py-1 mt-4 text-base bg-gray-100 border-0 rounded focus:outline-none hover:bg-gray-200 md:mt-0"
              onClick={() => setOpenCart(!openCart)}
            >
              <ShoppingCartIcon className="w-6 h-6 mr-1" />
              Cart
            </button>
            {openCart && <Cart />}
            <button
              className="inline-flex items-center px-3 py-1 mt-4 ml-4 text-base bg-gray-100 border-0 rounded focus:outline-none hover:bg-gray-200 md:mt-0"
              onClick={handleLogout}
            >
              Logout
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-4 h-4 ml-1"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </button>
          </>
        ) : (
          <Link to="/Auth">
            <button className="inline-flex items-center px-3 py-1 mt-4 text-base bg-gray-100 border-0 rounded focus:outline-none hover:bg-gray-200 md:mt-0">
              Login
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-4 h-4 ml-1"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;
