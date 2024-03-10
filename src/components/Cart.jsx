import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  removeItemFromCart,
  increaseItemQuantity,
  decreaseItemQuantity,
} from "../store/slices/cartSlice";
export default function Cart() {
  const [open, setOpen] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const userId = useSelector((state) => state.user.userId);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(
          `https://pizza-delivery-application-backend.onrender.com/api/cart/${userId}`
        );
        setCartItems(response.data.cart.items);
        console.log(response.data.cart.items);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCart();
  }, []);
  const getTotalPrice = async () => {
    try {
      const response = await axios.get(
        `https://pizza-delivery-application-backend.onrender.com/api/cart/total/${userId}`
      );
      setTotal(response.data.totalAmount);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTotalPrice();
  }, [cartItems]);
  const handleRemoveFromCart = (pizzaId) => {
    try {
      const response = axios.delete(
        `https://pizza-delivery-application-backend.onrender.com/api/cart/remove/${pizzaId}/${userId}`
      );

      setCartItems(cartItems.filter((item) => item.pizza._id !== pizzaId));
      dispatch(removeItemFromCart(pizzaId));
      toast.success("Item removed from cart");
      getTotalPrice();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const handleIncreaseQuantity = (productId) => {
    try {
      const response = axios.put(
        `https://pizza-delivery-application-backend.onrender.com/api/cart/increase/${productId}/${userId}`
      );
      dispatch(increaseItemQuantity(productId, 1));
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.pizza._id === productId
            ? { ...item, quantity: item.quantity + 1 } // Reduce quantity for the specific product
            : item
        )
      );
      getTotalPrice();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    // Dispatch an action to increase quantity
    // Assuming you have an action creator for increasing quantity
  };

  // Function to handle decreasing item quantity
  const handleDecreaseQuantity = (productId) => {
    try {
      const response = axios.put(
        `https://pizza-delivery-application-backend.onrender.com/api/cart/reduce/${productId}/${userId}`
      );

      dispatch(decreaseItemQuantity(productId, 1));
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.pizza._id === productId && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 } // Reduce quantity for the specific product
            : item
        )
      );
      getTotalPrice();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    // Dispatch an action to decrease quantity
    // Assuming you have an action creator for decreasing quantity
  };
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="fixed inset-y-0 right-0 flex max-w-full pl-10 pointer-events-none">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="w-screen max-w-md pointer-events-auto">
                  <div className="flex flex-col h-full overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 px-4 py-6 overflow-y-auto sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          Shopping cart
                        </Dialog.Title>
                        <div className="flex items-center ml-3 h-7">
                          <button
                            type="button"
                            className="relative p-2 -m-2 text-gray-400 hover:text-gray-500"
                            onClick={() => setOpen(false)}
                          >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="w-6 h-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul
                            role="list"
                            className="-my-6 divide-y divide-gray-200"
                          >
                            {cartItems.map((product) => (
                              <li key={product.id} className="flex py-6">
                                <div className="flex-shrink-0 w-24 h-24 overflow-hidden border border-gray-200 rounded-md">
                                  <img
                                    src={product.pizza.image}
                                    alt={product.pizza.image}
                                    className="object-cover object-center w-full h-full"
                                  />
                                </div>

                                <div className="flex flex-col flex-1 ml-4">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>
                                        <a href={product.href}>
                                          {product.pizza.name}
                                        </a>
                                      </h3>
                                      <p className="ml-4">
                                        ₹{" "}
                                        {`${
                                          product.quantity * product.pizza.price
                                        }`}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex items-end justify-between flex-1 text-sm">
                                    <button
                                      type="button"
                                      className="font-medium text-indigo-600 hover:text-indigo-500"
                                      onClick={() =>
                                        handleDecreaseQuantity(
                                          product.pizza._id
                                        )
                                      }
                                    >
                                      -
                                    </button>
                                    <p className="text-gray-500">
                                      Qty {product.quantity}
                                    </p>
                                    <button
                                      type="button"
                                      className="font-medium text-indigo-600 hover:text-indigo-500"
                                      onClick={() =>
                                        handleIncreaseQuantity(
                                          product.pizza._id
                                        )
                                      }
                                    >
                                      +
                                    </button>
                                    <div className="flex">
                                      <button
                                        type="button"
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                        onClick={() =>
                                          handleRemoveFromCart(
                                            product.pizza._id
                                          )
                                        }
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="px-4 py-6 border-t border-gray-200 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Total</p>
                        <p>₹ {total}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        Shipping and taxes calculated at checkout.
                      </p>
                      <div className="mt-6">
                        <Link
                          to="/checkout"
                          onClick={() => setOpen(false)}
                          className="flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700"
                        >
                          Checkout
                        </Link>
                      </div>
                      <div className="flex justify-center mt-6 text-sm text-center text-gray-500">
                        <p>
                          or{" "}
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={() => setOpen(false)}
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
