// src/frontend/cart/CartContext.jsx
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem("cart-v1") || "[]"); }
    catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem("cart-v1", JSON.stringify(items));
  }, [items]);

  function addItem(product, qty = 1) {
    setItems((prev) => {
      const i = prev.findIndex(p => p.id === product.id);
      if (i >= 0) {
        const clone = [...prev];
        clone[i] = { ...clone[i], qty: clone[i].qty + qty };
        return clone;
      }
      return [...prev, { ...product, qty }];
    });
  }
  function removeItem(id) { setItems(prev => prev.filter(p => p.id !== id)); }
  function clear() { setItems([]); }

  const total = useMemo(() => items.reduce((s, p) => s + p.price * p.qty, 0), [items]);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clear, total }}>
      {children}
    </CartContext.Provider>
  );
}
export function useCart(){ return useContext(CartContext); }
