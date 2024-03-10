import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const ResetPassword = () => {
  const [token, setToken] = useState(""); // Extract the token from the URL params
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenParam = urlParams.get("token");
    if (tokenParam) {
      setToken(tokenParam);
    }
  }, []);
  const handleResetPassword = async (e) => {
    e.preventDefault();
    console.log(token);
    try {
      if (newPassword !== confirmPassword) {
        setErrorMessage("Passwords do not match");
        return;
      }

      // Send a request to the backend to reset the password
      const response = await axios.post(
        "http://localhost:3000/api/auth/reset-password",
        {
          token,
          newPassword,
        }
      );
      console.log(response.data);
      setResetSuccess(true);

      toast.success("Password reset successful");
    } catch (error) {
      console.error("Error resetting password:", error);
      setErrorMessage("Failed to reset password. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <ToastContainer />
      <div className="w-full max-w-md">
        <form
          className="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md"
          onSubmit={handleResetPassword}
        >
          <h2 className="mb-4 text-2xl font-bold">Reset Password</h2>
          {resetSuccess ? (
            <p className="text-green-600">Password reset successful</p>
          ) : (
            <>
              <div className="mb-4">
                <label
                  htmlFor="newPassword"
                  className="block mb-2 text-sm font-bold text-gray-700"
                >
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="confirmPassword"
                  className="block mb-2 text-sm font-bold text-gray-700"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              {errorMessage && (
                <p className="mb-4 text-red-500">{errorMessage}</p>
              )}
              <div className="flex items-center justify-between">
                <button
                  className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Reset Password
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
