import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Checkout = () => {
  const navigate = useNavigate();
  const userId = useSelector((state) => state.user.userId);
  console.log("User ID:", userId);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    zip: "",

    notes: "",
  });
  const [total, setTotal] = useState(0);

  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    console.log("fformData:", formData);
  }, [formData]);
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(
          `https://pizza-delivery-application-backend.onrender.com/api/cart/${userId}`
        );
        setCartItems(response.data.cart.items);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCart();
  }, [userId]);

  useEffect(() => {
    const fetchTotalAmount = async () => {
      try {
        const response = await axios.get(
          `https://pizza-delivery-application-backend.onrender.com/api/cart/total/${userId}`
        );
        setTotal(response.data.totalAmount);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTotalAmount();
  }, [userId, cartItems]);

  const confirmPayment = async (payment_id) => {
    try {
      const response = await axios.post(
        "https://pizza-delivery-application-backend.onrender.com/api/payment/verify",
        {
          payment_id: payment_id,
          userId: userId,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          address: formData.address,
          city: formData.city,

          zip: formData.zip,
          notes: formData.notes,
          items: cartItems,
        }
      );

      setTimeout(() => {
        toast.success(
          "Order Placed Successfully. Thank you for shopping with us"
        );
      }, 3000);

      navigate("/");

      // Handle success response from the backend
      // Update UI or show success message
    } catch (error) {
      console.error("Error confirming payment:", error);
      // Handle error
    }
  };

  const createRazorpayOrder = async () => {
    try {
      const response = await axios.post(
        "https://pizza-delivery-application-backend.onrender.com/api/payment/",
        {
          userId: userId,
        }
      );
      console.log(response.data);
      // Initialize Razorpay with options
      const options = {
        key: "rzp_test_1RKKP5rJBqKpT4", // Replace with your Razorpay key
        amount: total * 100, // Amount in paise
        currency: "INR",
        name: "Arul Pizza Hub",
        description: "Payment for pizza order",
        order_id: response.data.orderId,
        handler: function (response) {
          handlePaymentSuccess(response.razorpay_payment_id);
        },

        prefill: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          contact: "", // Add contact if needed
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error creating Razorpay order:", error);
    }
  };

  const handlePaymentSuccess = async (paymentId) => {
    console.log("Payment ID:", paymentId);

    // Set paymentId state
    await confirmPayment(paymentId); // Confirm the payment on the backend
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // You can validate the form data here if required
    createRazorpayOrder();
  };

  return (
    <>
      <ToastContainer />
      <div className="mt-4"></div>
      <h1 className="mb-4 text-xl font-bold text-center">CHECKOUT</h1>
      <div className="container p-12 mx-auto">
        <div className="flex flex-col w-full px-0 mx-auto md:flex-row">
          <div className="flex flex-col md:w-full">
            <h2 className="mb-4 font-bold md:text-xl text-heading ">
              Shipping Address
            </h2>
            <form
              className="justify-center w-full mx-auto"
              method="post"
              onSubmit={handleSubmit}
            >
              <div className="">
                <div className="space-x-0 lg:flex lg:space-x-4">
                  <div className="w-full lg:w-1/2">
                    <label
                      htmlFor="firstName"
                      className="block mb-3 text-sm font-semibold text-gray-500"
                    >
                      First Name
                    </label>
                    <input
                      name="firstName"
                      type="text"
                      placeholder="First Name"
                      className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                      onChange={(e) =>
                        setFormData({ ...formData, firstName: e.target.value })
                      }
                    />
                  </div>
                  <div className="w-full lg:w-1/2 ">
                    <label
                      htmlFor="lastName"
                      className="block mb-3 text-sm font-semibold text-gray-500"
                    >
                      Last Name
                    </label>
                    <input
                      name="lastName"
                      type="text"
                      placeholder="Last Name"
                      className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                      onChange={(e) =>
                        setFormData({ ...formData, lastName: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="w-full">
                    <label
                      htmlFor="email"
                      className="block mb-3 text-sm font-semibold text-gray-500"
                    >
                      Email
                    </label>
                    <input
                      name="email"
                      type="text"
                      placeholder="Email"
                      className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="w-full">
                    <label
                      htmlFor="email"
                      className="block mb-3 text-sm font-semibold text-gray-500"
                    >
                      Address
                    </label>
                    <input
                      name="address"
                      type="text"
                      placeholder="Address"
                      className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="w-full">
                    <label
                      htmlFor="city"
                      className="block mb-3 text-sm font-semibold text-gray-500"
                    >
                      City
                    </label>
                    <input
                      name="city"
                      type="text"
                      placeholder="City"
                      className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                      onChange={(e) =>
                        setFormData({ ...formData, city: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="w-full">
                    <label
                      htmlFor="zip"
                      className="block mb-3 text-sm font-semibold text-gray-500"
                    >
                      Zip
                    </label>
                    <input
                      name="zip"
                      type="number"
                      placeholder="Zip"
                      className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                      onChange={(e) =>
                        setFormData({ ...formData, zip: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="w-full">
                    <label
                      htmlFor="notes"
                      className="block mb-3 text-sm font-semibold text-gray-500"
                    >
                      Notes (optional)
                    </label>
                    <input
                      name="notes"
                      type="textarea"
                      placeholder="NOtES "
                      className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                      onChange={(e) =>
                        setFormData({ ...formData, notes: e.target.value })
                      }
                    />
                  </div>
                </div>

                <button
                  className="w-full px-6 py-2 text-blue-200 bg-blue-600 hover:bg-blue-900"
                  type="submit"
                >
                  Process Payment
                </button>
              </div>
            </form>
          </div>
          <div className="flex flex-col w-full ml-0 lg:ml-12 lg:w-2/5">
            <div className="pt-12 md:pt-0 2xl:ps-4">
              <h2 className="text-xl font-bold">Order Summary</h2>
              <div className="mt-8">
                {/* Display order summary */}
                {cartItems.map((product) => (
                  <div className="flex space-x-4" key={product._id}>
                    <div>
                      <img
                        src={product.pizza.image}
                        alt="image"
                        className="w-60"
                      />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">
                        {product.pizza.name}
                      </h2>
                      <span className="font-thin">
                        Price ₹{product.pizza.price}
                      </span>
                      <br />
                      <span className="font-thin">
                        Quantity {product.quantity}
                      </span>
                    </div>
                    <div></div>
                  </div>
                ))}
              </div>
              <div className="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                Total<span className="ml-2">₹{total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
