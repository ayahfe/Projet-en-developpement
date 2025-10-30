import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { createCheckout } from '../utils/stripeApi';

export default function Panier() {
  const { cart, removeFromCart, clearCart } = useCart();
  const [open, setOpen] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    if (cart.length === 0) return alert("Votre panier est vide !");
    const { url } = await createCheckout(cart);
    if (url) window.location.href = url;
  };

  return (
    <>
      <button onClick={() => setOpen(true)}>
        🛍️ Voir le panier ({cart.length})
      </button>

      {open && (
        <div style={{
          position: "fixed",
          right: 0,
          top: 0,
          width: 350,
          height: "100%",
          background: "white",
          boxShadow: "-4px 0 12px rgba(0,0,0,0.2)",
          padding: 20,
          zIndex: 1000
        }}>
          <button onClick={() => setOpen(false)}>Fermer</button>
          <h2>Mon panier</h2>

          {cart.length === 0 ? (
            <p>Votre panier est vide</p>
          ) : (
            <>
              {cart.map(item => (
                <div key={item.id} style={{ marginBottom: 12, borderBottom: "1px solid #ddd" }}>
                  <h4>{item.name}</h4>
                  <p>{item.price}$ × {item.quantity}</p>
                  <button onClick={() => removeFromCart(item.id)}>Supprimer</button>
                </div>
              ))}
              <h3>Total: {total.toFixed(2)} $</h3>
              <button onClick={handleCheckout}>Payer (fake)</button>
              <button onClick={clearCart}>Vider le panier</button>
            </>
          )}
        </div>
      )}
    </>
  );
}
