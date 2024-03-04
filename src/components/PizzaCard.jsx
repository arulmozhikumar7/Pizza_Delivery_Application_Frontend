import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addItemToCart } from "../store/slices/cartSlice";

const PizzaCard = ({ pizza }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.userId); // Assuming user ID is stored in the Redux store

  const handleAddToCart = async () => {
    try {
      console.log(pizza._id);
      console.log(userId);
      const response = await axios.post(`http://localhost:3000/api/cart/add`, {
        userid: userId,
        pizzaId: pizza._id,
        quantity: 1,
      });
      dispatch(addItemToCart(pizza)); // Dispatch addItemToCart action with pizza data
      console.log("Pizza added to cart:", response.data);
    } catch (error) {
      console.error("Error adding pizza to cart:", error);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-xs my-10 overflow-hidden bg-white border border-gray-100 rounded-lg shadow-md group">
      <a
        className="relative flex mx-3 mt-3 overflow-hidden h-60 rounded-xl"
        href="#"
      >
        <img
          className="absolute top-0 right-0 object-cover w-full h-full peer"
          src={pizza.image}
          alt="product image"
        />
      </a>
      <div className="px-5 pb-5 mt-4">
        <a href="#">
          <h5 className="text-xl tracking-tight text-slate-900">
            {pizza.name}
          </h5>
        </a>
        <div className="flex items-center justify-between mt-2 mb-5">
          <p>
            <span className="text-3xl font-bold text-slate-900">
              ₹{pizza.price}
            </span>
          </p>
        </div>
        <button
          onClick={handleAddToCart}
          className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          Add to cart
        </button>
      </div>
    </div>
  );
};

const PizzaList = () => {
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    const getPizzas = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/pizza/getpizzas"
        );
        setPizzas(response.data);
        console.log("Pizzas fetched successfully");
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getPizzas();
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-3">
      {pizzas.map((pizza) => (
        <PizzaCard key={pizza._id} pizza={pizza} />
      ))}
    </div>
  );
};

export default PizzaList;
