// src/frontend/cart/Cart.jsx
import React, { useState } from "react";
import { useCart } from "./CartContext";
import "./Cart.css";

export default function Cart() {
  const { cart, removeFromCart, clearCart, total } = useCart();
  const [loading, setLoading] = useState(false);

  // 👉 version Stripe Checkout réelle
  const handleStripePayment = async () => {
    try {
      setLoading(true);

      const res = await fetch("http://localhost:4242/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart.map((it) => ({
            id: it.id,
            name: it.name,
            price: it.price,
            quantity: it.quantity || 1,
            image: it.image,
          })),
        }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url; // 🔥 redirige vers Stripe Checkout
      } else {
        alert("❌ Erreur : impossible de créer la session Stripe.");
        console.log("Stripe response:", data);
      }
    } catch (err) {
      console.error("Erreur Stripe:", err);
      alert("Erreur lors de la tentative de paiement.");
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0)
    return (
      <div className="cart-container">
        <h2>🛒 Votre panier est vide</h2>
      </div>
    );

  return (
    <div className="cart-container">
      <h2>🛍️ Votre Panier</h2>
      {cart.map((item) => (
        <div key={item.id} className="cart-item">
          <img src={item.image} alt={item.name} />
          <div className="cart-info">
            <strong>{item.name}</strong>
            <span>
              {item.quantity} × {item.price.toFixed(2)} $
            </span>
          </div>
          <button onClick={() => removeFromCart(item.id)}>❌</button>
        </div>
      ))}

      <div className="cart-summary">
        <h3>Total : {total.toFixed(2)} $</h3>
        <button
          className="btn-pay"
          onClick={handleStripePayment}
          disabled={loading}
        >
          {loading ? "Redirection vers Stripe..." : "💳 Payer avec Stripe (test)"}
        </button>
        <button
          style={{ marginLeft: 10, background: "#ccc" }}
          onClick={clearCart}
        >
          Vider le panier
        </button>
      </div>
    </div>
  );
}
