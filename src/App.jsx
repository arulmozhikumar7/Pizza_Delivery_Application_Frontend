import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Checkout from "./components/Checkout";
import { useSelector } from "react-redux";
import AdminPage from "./pages/AdminPage";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
const App = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const isAdmin = useSelector((state) => state.user.isAdmin);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {isAdmin && isAuthenticated ? (
            <Route path="/" element={<AdminPage />} />
          ) : null}
          <Route path="/Auth" element={<Auth />} />
          <Route path="/" element={<Home />} />
          <Route path="/Checkout" element={<Checkout />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/api/auth/reset-password" element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
