import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { setCartItems } from "../store/slices/cartSlice";
import { Link } from "react-router-dom";
import axios from "axios";
const Auth = () => {
  const [activeTab, setActiveTab] = useState("login");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginformData, setloginFormData] = useState({
    name: "",
    password: "",
  });
  const [registerFormData, setRegisterFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleRegisterChange = (event) => {
    setRegisterFormData({
      ...registerFormData,
      [event.target.name]: event.target.value,
    });
  };

  const handleLoginChange = (event) => {
    setloginFormData({
      ...loginformData,
      [event.target.name]: event.target.value,
    });
  };

  const sendLoginData = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post(
        "https://pizza-delivery-application-backend.onrender.com/api/auth/signin",
        loginformData
      );
      console.log(response.data);
      dispatch(loginSuccess(response.data));
      const cartResponse = await axios.get(
        `https://pizza-delivery-application-backend.onrender.com/api/cart/${response.data.userId}`
      );

      dispatch(setCartItems(cartResponse.data.cart.items));
      console.log(cartResponse.data.cart);
      console.log("Login Successful");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const sendRegisterData = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post(
        "https://pizza-delivery-application-backend.onrender.com/api/auth/signup",
        registerFormData
      );
      alert("Registered Successfully.Check your mail for verification");
      setActiveTab("login");
      setRegisterFormData({
        name: "",
        email: "",
        password: "",
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto sm:max-w-md md:h-screen lg:py-0 lg:w-1/3">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img className="w-8 h-8 mr-2" src="/pizza.png" alt="logo" />
          Arul's Pizza Hub
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="flex justify-between">
              <button
                className={`text-sm font-medium ${
                  activeTab === "login"
                    ? "text-primary-600 border-b-2 border-primary-600"
                    : "text-gray-500 dark:text-gray-400"
                }`}
                onClick={() => setActiveTab("login")}
              >
                Login
              </button>
              <button
                className={`text-sm font-medium ${
                  activeTab === "register"
                    ? "text-primary-600 border-b-2 border-primary-600"
                    : "text-gray-500 dark:text-gray-400"
                }`}
                onClick={() => setActiveTab("register")}
              >
                Register
              </button>
            </div>
            {activeTab === "login" ? (
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={(event) => sendLoginData(event)}
                method="POST"
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Username
                  </label>
                  <input
                    type="name"
                    name="name"
                    onChange={handleLoginChange}
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Eg: arularul_7"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    onChange={handleLoginChange}
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Link
                    to="/forgot-password"
                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Forgot password?
                  </Link>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign in
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{" "}
                  <a
                    href="#"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign up
                  </a>
                </p>
              </form>
            ) : (
              <form
                className="space-y-4 md:space-y-6 "
                onSubmit={(event) => sendRegisterData(event)}
                method="POST"
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Username
                  </label>
                  <input
                    type="name"
                    name="name"
                    onChange={handleRegisterChange}
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Eg: arularul_7"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    onChange={handleRegisterChange}
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Eg: arulmozhikumar7@gmail.com"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    onChange={handleRegisterChange}
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                </div>
                <div className="flex items-center justify-between">
                  <a
                    href="#"
                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Forgot password?
                  </a>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign up
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already a user?{" "}
                  <a
                    href="#"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign in
                  </a>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Auth;
