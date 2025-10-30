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
}
