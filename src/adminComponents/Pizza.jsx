import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Pizza = () => {
  const [pizzas, setPizzas] = useState([]);
  const [editingPizza, setEditingPizza] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedPrice, setEditedPrice] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedImage, setEditedImage] = useState("");
  const [showAddPizzaModal, setShowAddPizzaModal] = useState(false);
  const [newPizzaData, setNewPizzaData] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://pizza-delivery-application-backend.onrender.com/api/pizza/getpizzas"
        );
        console.log(response.data);
        setPizzas(response.data);
      } catch (error) {
        console.error("Error fetching pizzas:", error);
      }
    };

    fetchData();
  }, []);

  const handleEditPizza = (pizza) => {
    setEditingPizza(pizza);
    setEditedName(pizza.name);
    setEditedPrice(pizza.price);
    setEditedDescription(pizza.description);
    setEditedImage(pizza.image);
  };

  const handleUpdatePizza = async () => {
    try {
      const updatedPizza = {
        ...editingPizza,
        name: editedName,
        price: editedPrice,
        description: editedDescription,
        image: editedImage,
      };
      await axios.put(
        `https://pizza-delivery-application-backend.onrender.com/api/pizza/editpizza/${editingPizza._id}`,
        updatedPizza
      );
      // Refresh the pizza list after updating
      const response = await axios.get(
        "https://pizza-delivery-application-backend.onrender.com/api/pizza/getpizzas"
      );
      setPizzas(response.data);
      // Reset editing state
      setEditingPizza(null);
      toast.success("Pizza updated successfully!");
    } catch (error) {
      console.error("Error updating pizza:", error);
    }
  };
  const handleAddPizza = async () => {
    try {
      const response = await axios.post(
        "https://pizza-delivery-application-backend.onrender.com/api/pizza/addpizza",
        newPizzaData
      );
      console.log(response.data);
      setShowAddPizzaModal(false);
      setNewPizzaData({
        name: "",
        price: "",
        image: "",
        description: "",
      });

      // Refresh the pizza list
      const pizzas = await axios.get(
        "https://pizza-delivery-application-backend.onrender.com/api/pizza/getpizzas"
      );
      setPizzas(pizzas.data);
      toast.success("Pizza added successfully!");
    } catch (error) {
      console.error("Error adding pizza:", error);
    }
  };
  return (
    <>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Pizza Name
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Image URL
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {pizzas.map((pizza) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                key={pizza._id}
              >
                <td className="px-6 py-4">{pizza.name}</td>
                <td className="px-6 py-4">{pizza.price}</td>
                <td className="px-6 py-4">{pizza.description}</td>
                <td className="px-6 py-4">{pizza.image}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleEditPizza(pizza)}
                    className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Modal or form for editing pizza */}
      {editingPizza && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 text-center">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg font-medium leading-6 text-gray-900"
                      id="modal-title"
                    >
                      Edit Pizza
                    </h3>
                    <div className="mt-2">
                      <div className="mb-4">
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          value={editedName}
                          onChange={(e) => setEditedName(e.target.value)}
                          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="price"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Price
                        </label>
                        <input
                          type="number"
                          name="price"
                          id="price"
                          value={editedPrice}
                          onChange={(e) => setEditedPrice(e.target.value)}
                          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="image"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Image URL
                        </label>
                        <input
                          type="text"
                          name="image"
                          id="image"
                          value={editedImage}
                          onChange={(e) => setEditedImage(e.target.value)}
                          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="description"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Description
                        </label>
                        <textarea
                          id="description"
                          name="description"
                          rows="3"
                          value={editedDescription}
                          onChange={(e) => setEditedDescription(e.target.value)}
                          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={handleUpdatePizza}
                  type="button"
                  className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setEditingPizza(null)}
                  type="button"
                  className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showAddPizzaModal && (
        <div className="fixed inset-0 z-10 flex items-center justify-center overflow-y-auto bg-gray-800 bg-opacity-75">
          <div className="p-8 bg-white rounded-md">
            <h2 className="mb-4 text-2xl font-bold">Add Pizza</h2>
            <input
              type="text"
              placeholder="Name"
              className="block w-full px-4 py-2 mb-2 border border-gray-300 rounded-md"
              value={newPizzaData.name}
              onChange={(e) =>
                setNewPizzaData({ ...newPizzaData, name: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Price"
              className="block w-full px-4 py-2 mb-2 border border-gray-300 rounded-md"
              value={newPizzaData.price}
              onChange={(e) =>
                setNewPizzaData({ ...newPizzaData, price: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Image URL"
              className="block w-full px-4 py-2 mb-2 border border-gray-300 rounded-md"
              value={newPizzaData.image}
              onChange={(e) =>
                setNewPizzaData({ ...newPizzaData, image: e.target.value })
              }
            />
            <textarea
              placeholder="Description"
              className="block w-full px-4 py-2 mb-4 border border-gray-300 rounded-md resize-none"
              value={newPizzaData.description}
              onChange={(e) =>
                setNewPizzaData({
                  ...newPizzaData,
                  description: e.target.value,
                })
              }
            ></textarea>
            <div className="flex justify-end">
              <button
                onClick={handleAddPizza}
                className="px-4 py-2 mr-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                Add Pizza
              </button>
              <button
                onClick={() => setShowAddPizzaModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-300 rounded-md hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-center mt-4">
        <button
          className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
          onClick={() => setShowAddPizzaModal(true)}
        >
          Add Pizza
        </button>
      </div>
    </>
  );
};

export default Pizza;
