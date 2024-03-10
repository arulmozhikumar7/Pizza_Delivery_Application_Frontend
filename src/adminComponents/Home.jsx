import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import User from "./User";
import Order from "./Order";
import Pizza from "./Pizza";
const Home = () => {
  const [showUsers, setShowUsers] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  const [showPizzas, setShowPizzas] = useState(false);
  const handleClick = () => {
    setShowUsers(!showUsers);
  };
  const handleClick2 = () => {
    setShowOrders(!showOrders);
  };
  const handleClick3 = () => {
    setShowPizzas(!showPizzas);
  };

  return (
    <>
      <ToastContainer />
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        <button
          href="#"
          onClick={handleClick}
          class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Users
          </h5>
          <p class="font-normal text-gray-700 dark:text-gray-400">
            View all users using this application from here
          </p>
        </button>
        <button
          href="#"
          onClick={handleClick2}
          class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Orders
          </h5>
          <p class="font-normal text-gray-700 dark:text-gray-400">
            View all orders using this application from here
          </p>
        </button>
        <button
          href="#"
          onClick={handleClick3}
          class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Pizza
          </h5>
          <p class="font-normal text-gray-700 dark:text-gray-400">
            View all pizza available in the store
          </p>
        </button>
      </div>
      {showUsers ? <User /> : null}
      {showOrders ? <Order /> : null}
      {showPizzas ? <Pizza /> : null}
    </>
  );
};

export default Home;
