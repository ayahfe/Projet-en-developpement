<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import React from 'react';
import { useCart } from '../cartContext/CartContext';
import './ProduitCard.css';

export default function ProduitCard({ produit }) {
    const { addToCart } = useCart();

=======
import React from 'react';
import { PRODUIT } from '../../data/produitList';  
import './ProduitCard.css';

function ProduitCard({ produit }) {
>>>>>>> 9965a5d (feat(auth): rajout test cypress)
    return (
        <div className="produit-card">
            <img src={produit.image} alt={produit.name} />
            <h3>{produit.name}</h3>
            <p>{produit.description}</p>
            <strong>{produit.price} $</strong>
<<<<<<< HEAD
            <br />
            <button onClick={() => addToCart(produit)}>Ajouter au panier</button>
        </div>
    );
=======
=======
>>>>>>> origin/temp-visualiser-fix
import { useEffect, useState } from "react";
import { PRODUIT } from "../../data/produitList";
import { useCart } from "../cart/CartContext";
import "./ProduitCard.css";

export default function ProduitList() {
  const [produits, setProduits] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    setProduits(PRODUIT);
  }, []);

  return (
    <div className="produit-list">
      {produits.map((p) => (
        <div key={p.id} className="produit-card">
          <img src={p.image} alt={p.name} />
          <h3>{p.name}</h3>
          <p>{p.description}</p>
          <strong>{p.price.toFixed(2)} $</strong>
          <button className="btn-add" onClick={() => addToCart(p)}>
            Ajouter au panier
          </button>
        </div>
      ))}
    </div>
  );
<<<<<<< HEAD
>>>>>>> af96563 ([Add] Addition des fichiers Cart.jsx, CartContext et Cart.css et stripe.js)
=======
>>>>>>> origin/temp-visualiser-fix
}
=======
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
>>>>>>> 9965a5d (feat(auth): rajout test cypress)
