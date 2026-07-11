"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getCart } from "../app/utils/cart";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (err) {
        console.error(err);
      }
    }
  }, []);

  useEffect(() => {
    if (user) {
      loadCart();
    } else {
      setCart([]);
    }
  }, [user]);

  async function loadCart() {
    try {
      const res = await getCart();

      if (!res.ok) return;

      const data = await res.json();

      setCart(data.cart || []);
    } catch (err) {
      console.error(err);
    }
  }

  const loginUser = (userData, token) => {
    localStorage.setItem("access_token", token);
    localStorage.setItem("user", JSON.stringify(userData));

    setUser(userData);
  };

  const logoutUser = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");

    setUser(null);
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        user,
        cart,
        setCart,
        loadCart,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}