import React, { useEffect, useState } from "react";
import "./MesCommandes.css";

export default function MesCommandes() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Récupère les commandes sauvegardées après paiement
    const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(savedOrders.reverse()); // affiche les plus récentes d’abord
  }, []);

  if (orders.length === 0)
    return (
      <div className="orders-container">
        <h2>📦 Aucune commande trouvée</h2>
        <p>Vous n’avez encore rien commandé.</p>
      </div>
    );

  return (
    <div className="orders-container">
      <h2>🧾 Mes Commandes</h2>
      {orders.map((order) => (
        <div key={order.id} className="order-card">
          <div className="order-header">
            <h3>Commande #{order.id}</h3>
            <span>{order.date}</span>
          </div>

          <ul className="order-items">
            {order.items.map((item) => (
              <li key={item.id}>
                <div className="item-info">
                  <img src={item.image} alt={item.name} />
                  <span>{item.name}</span>
                </div>
                <span className="item-price">
                  {item.quantity} × {item.price.toFixed(2)} $
                </span>
              </li>
            ))}
          </ul>

          <div className="order-total">
            Total : <strong>{order.total} $</strong>
          </div>
        </div>
      ))}
    </div>
  );
}
