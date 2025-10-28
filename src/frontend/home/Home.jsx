// src/frontend/home/Home.jsx
import React from "react";
import ProduitList from "../produitCard/ProduitCard";

export default function Home() {
  return (
    <div className="container hero">
      <h1>PharmaPlus</h1>
      <p>Commandez vos essentiels santé en un clic.</p>
      <ProduitList />
    </div>
  );
}
