// src/frontend/produitCard/ProduitCard.jsx
import React from "react";
import { PRODUIT } from "../../data/produitList";
import "./ProduitCard.css";

function ProduitCard({ produit }) {
  return (
    <div className="produit-card">
      <img src={produit.image} alt={produit.name} />
      <h3>{produit.name}</h3>
      <p>{produit.description}</p>
      <strong>{produit.price.toFixed(2)} $</strong>
    </div>
  );
}

export default function ProduitList() {
  return (
    <div className="produit-list container">
      {PRODUIT.map((produit) => (
        <ProduitCard key={produit.id} produit={produit} />
      ))}
    </div>
  );
}
