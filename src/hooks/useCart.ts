import { useState, useEffect, useMemo } from "react";
import { db } from "../data/db";
import type { Guitar, CartItem } from "../types";

export const useCart = () => {
  const initialCart = (): CartItem[] => {
    const localStorageCart = localStorage.getItem("cart");
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  };

  const [data] = useState(db);
  const [cart, setCart] = useState(initialCart);

  const MAX_QUANTITY = 5;
  const MIN_QUANTITY = 1;

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function addToCart(item: Guitar) {
    const itemExists = cart.findIndex((cartItem) => cartItem.id === item.id);
    if (itemExists >= 0) {
      if (cart[itemExists].quantity >= MAX_QUANTITY) return;
      const updatedCart = [...cart];
      updatedCart[itemExists].quantity += 1;
      setCart(updatedCart);
    } else {
      const newItem: CartItem = { ...item, quantity: 1 };
      setCart([...cart, newItem]);
    }
  }

  function removeFromCart(id : Guitar['id']) {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  }

  function decreaseQuantity(id : Guitar['id']) {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.quantity > MIN_QUANTITY) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCart(updatedCart);
  }

  function increaseQuantity(id : Guitar['id']) {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.quantity < MAX_QUANTITY) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCart(updatedCart);
  }

  function clearCart() {
    setCart([]);
  }

  const isEmpty = useMemo(() => cart.length === 0, [cart]);
  const cartTotal = useMemo(() => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cart]);

  return {
    data,
    cart,
    addToCart,
    removeFromCart,
    decreaseQuantity,
    increaseQuantity,
    clearCart,
    isEmpty,
    cartTotal,
  };
};
