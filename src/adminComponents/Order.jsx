import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Order = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/order");
        console.log(response.data);
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to ensure useEffect runs only once on component mount

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(`http://localhost:3000/api/order/${orderId}`, {
        status: newStatus,
      });
      // After updating the status, fetch the updated orders again
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );

      const response = await axios.get(`http://localhost:3000/api/order`);
      setOrders(response.data);
      toast.success("Status updated successfully");
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Order Id
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Address
              </th>
              <th scope="col" className="px-6 py-3">
                City
              </th>
              <th scope="col" className="px-6 py-3">
                Zip
              </th>
              <th scope="col" className="px-6 py-3">
                Items
              </th>
              <th scope="col" className="px-6 py-3">
                Amount
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {order._id}
                </th>
                <td className="px-6 py-4">{order.email}</td>
                <td className="px-6 py-4">{order.address}</td>
                <td className="px-6 py-4">{order.city}</td>
                <td className="px-6 py-4">{order.zip}</td>
                <td className="px-6 py-4">
                  <ul>
                    {order.items.map((item) => (
                      <li key={item._id}>
                        {item.pizza.name} Quantity: {item.quantity}
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="px-6 py-4">{order.totalAmount}</td>
                <td className="px-6 py-4">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                    className="px-2 py-1 bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="received">Received</option>
                    <option value="inKitchen">In Kitchen</option>
                    <option value="sentToDelivery">Sent to Delivery</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Order;
