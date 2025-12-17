import { useEffect, useState } from "react";
import { PRODUIT } from "../../data/produitList";   // <- même chemin que ProduitCard
import "./ClientHome.css";

export default function ClientHome() {
  const [cartCount, setCartCount] = useState(0);
  const [flash, setFlash] = useState("");

  // lire quantité totale au chargement
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartCount(cart.reduce((sum, it) => sum + (it.qty || 1), 0));
  }, []);

  function addToCart(prod) {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const idx = cart.findIndex((it) => it.id === prod.id);
    if (idx >= 0) {
      cart[idx].qty = (cart[idx].qty || 1) + 1;
    } else {
      cart.push({ id: prod.id, name: prod.name, price: prod.price, image: prod.image, qty: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    setCartCount(cart.reduce((sum, it) => sum + (it.qty || 1), 0));

    // mini toast
    setFlash(`${prod.name} ajouté au panier`);
    setTimeout(() => setFlash(""), 1200);
  }

  return (
    <div className="client-page">
      <div className="client-header">
        <h2>Espace Client</h2>
        <div className="cart-pill" title="Articles dans le panier">
          Panier <span>{cartCount}</span>
        </div>
      </div>

      {flash && <div className="toast">{flash}</div>}

      <div className="grid-products">
        {PRODUIT.map((p) => (
          <div key={p.id} className="p-card">
            <div className="p-img">
              <img src={p.image} alt={p.name} />
            </div>
            <h3 className="p-name">{p.name}</h3>
            <p className="p-desc">{p.description}</p>
            <div className="p-bottom">
              <span className="p-price">{Number(p.price).toFixed(2)} $</span>
              <button className="btn-add" onClick={() => addToCart(p)}>Ajouter au panier</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
