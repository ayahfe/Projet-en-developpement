import React from "react";
// 1. ADD THIS IMPORT BACK
import { PRODUIT } from "../../data/produitList";
import "./ProduitCard.css";

function ProduitCard({ produit, isPriority }) {
  return (
    <div className="produit-card">
      <picture>
        <img
          src={produit.image}
          alt={produit.name}
          loading={isPriority ? "eager" : "lazy"}
          style={{ fetchPriority: isPriority ? "high" : "auto" }}
        />
        <source srcSet={produit.imageAvif} type="image/avif" />
        <source srcSet={produit.imageWebp} type="image/webp" />
      </picture>
      
      <h3>{produit.name}</h3>
      <p>{produit.description}</p>
      <strong>{produit.price} $</strong>
    </div>
  );
}

export default function ProduitList() {
  return (
    <div
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
    >
      {PRODUIT.map((produit, index) => (
        <ProduitCard
          key={produit.id}
          produit={produit}
          isPriority={index < 2}
        />
      ))}
    </div>
  );
}
