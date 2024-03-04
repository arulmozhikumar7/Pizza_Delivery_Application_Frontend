import React from "react";
import PizzaList from "../components/PizzaCard";
import Cart from "../components/Cart";
import { useSelector } from "react-redux";
// Wherever you want to reset local storage
//import { resetLocalStorage } from "../storage/localStorage";

//resetLocalStorage();
const Home = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const token = useSelector((state) => state.user.token);
  const userId = useSelector((state) => state.user.userId);
  console.log("User ID:", userId);

  console.log("Is Authenticated:", isAuthenticated);
  console.log("Token:", token);
  return (
    <>
      {isAuthenticated && <Cart />}
      <PizzaList />
    </>
  );
};

export default Home;
