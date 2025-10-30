import { Link } from "react-router-dom";

export default function ProduitsAdmin(){
  return (
    <section>
      <h1>Gestion Produits (Médecin)</h1>
      <p><Link className="mp-btn primary" to="/medecin/produits/nouveau">+ Nouveau produit</Link></p>
      <p>— Ici: tableau d’admin plus tard —</p>
    </section>
  );
}
