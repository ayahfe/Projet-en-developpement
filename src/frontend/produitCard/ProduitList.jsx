// src/frontend/produitCard/ProduitList.jsx
import { PRODUIT } from "../../data/produitList";
import "./ProduitCard.css";
import { useAuth } from "../AuthContext"; // 🔥 bon chemin selon ta structure: frontend/AuthContext.jsx

export default function ProduitList() {
  const { user } = useAuth(); // récupère l’utilisateur connecté

  return (
    <div className="grid-products" style={{ padding: "2rem" }}>
      {PRODUIT.map((p) => (
        <div key={p.id} className="product-card">
          <img src={p.image} alt={p.name} />
          <h3>{p.name}</h3>
          <p>{p.description}</p>

          <div className="price-row">
            <span>{Number(p.price).toFixed(2)} $</span>

            {user ? (
              <button className="btn-add">Ajouter au panier</button>
            ) : (
              <button
                className="btn-disabled"
                onClick={() =>
                  alert("Vous devez être connecté pour ajouter un produit au panier.")
                }
              >
                Ajouter au panier
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
