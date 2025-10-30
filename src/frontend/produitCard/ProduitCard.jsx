import React from 'react';
import { useCart } from '../cartContext/CartContext';
import './ProduitCard.css';

export default function ProduitCard({ produit }) {
    const { addToCart } = useCart();

    return (
        <div className="produit-card">
            <img src={produit.image} alt={produit.name} />
            <h3>{produit.name}</h3>
            <p>{produit.description}</p>
            <strong>{produit.price} $</strong>
            <br />
            <button onClick={() => addToCart(produit)}>Ajouter au panier</button>
        </div>
    );
}
