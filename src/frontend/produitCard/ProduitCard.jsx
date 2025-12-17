// src/frontend/produitCard/ProduitCard.jsx
import React from 'react';
import { useCart } from '../cart/CartContext';
import './ProduitCard.css';

export default function ProduitCard({ produit }) {
  const { addToCart } = useCart();

  return (
    <div className="produit-card">
      <img src={produit.image} alt={produit.name} className="produit-image" />
      <h3 className="produit-name">{produit.name}</h3>
      <p className="produit-description">{produit.description}</p>
      <strong className="produit-price">{produit.price.toFixed(2)} $</strong>
      <button 
        className="btn-add" 
        onClick={() => addToCart(produit)}
      >
        Ajouter au panier
      </button>
    </div>
  );
}