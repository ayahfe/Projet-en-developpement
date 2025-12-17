// src/frontend/produitCard/ProduitList.jsx
import React from 'react';
import ProduitCard from './ProduitCard';
import './ProduitCard.css';

// Mock data if your data file doesn't exist
const PRODUIT = [
  {
    id: 1,
    name: "Advil",
    description: "Anti-inflammatoire pour la douleur",
    price: 12.99,
    image: "https://via.placeholder.com/200x200/007bff/ffffff?text=Advil"
  },
  {
    id: 2,
    name: "Tylenol",
    description: "Analgésique pour maux de tête",
    price: 9.99,
    image: "https://via.placeholder.com/200x200/28a745/ffffff?text=Tylenol"
  },
  {
    id: 3,
    name: "Aspirine",
    description: "Anti-douleur et anti-fièvre",
    price: 7.99,
    image: "https://via.placeholder.com/200x200/dc3545/ffffff?text=Aspirine"
  },
];

export default function ProduitList() {
  return (
    <div className="produit-list" style={{ paddingTop: '80px' }}>
      <h1 style={{ textAlign: 'center', color: 'white', marginBottom: '30px' }}>Pharmacie</h1>
      <div className="produits-container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', padding: '20px' }}>
        {PRODUIT.map(produit => (
          <ProduitCard key={produit.id} produit={produit} />
        ))}
      </div>
    </div>
  );
}