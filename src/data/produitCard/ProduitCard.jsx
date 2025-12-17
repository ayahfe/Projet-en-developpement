import React from 'react';
import { PRODUIT } from '../produitList';   // <-- chemin corrigé
import './ProduitCard.css';

function ProduitCard({ produit }) {
    return (
        <div className="produit-card">
            <img src={produit.image} alt={produit.name} />
            <h3>{produit.name}</h3>
            <p>{produit.description}</p>
            <strong>{produit.price} €</strong>
        </div>
    );
}

export default function ProduitList() {
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {PRODUIT.map(produit => (
                <ProduitCard key={produit.id} produit={produit} />
            ))}
        </div>
    );
}