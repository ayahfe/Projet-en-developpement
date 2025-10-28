import React from "react";
import ProduitCard from "../../frontend/produitCard/ProduitCard.jsx";
import { PRODUIT } from "../../data/produitList.js";
import "./Home.css";

export default function Pharmacie() {
  return (
    <section style={{ padding: 24 }}>
      <h1>Pharmacie</h1>
      <p>Liste des produits — ajoutez au panier si vous êtes client.</p>

      <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", marginTop: 20 }}>
        {Array.isArray(PRODUIT) && PRODUIT.length > 0 ? (
          PRODUIT.map((p) => <ProduitCard key={p.id || p.name} produit={p} />)
        ) : (
          <div>Aucun produit disponible</div>
        )}
      </div>
    </section>
  );
}