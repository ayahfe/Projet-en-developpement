import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import ProduitCard from "./ProduitCard.jsx";

export default function ProduitList({ items }) {
  // si `items` est fourni (props), on l'utilise; sinon on ira chercher en BDD
  const [data, setData] = useState(items ?? []);
  const [loading, setLoading] = useState(!items);
  const [error, setError] = useState("");

  useEffect(() => {
    if (items) return; // on a déjà des produits via props
    (async () => {
      setLoading(true);
      setError("");
      const { data, error } = await supabase
        .from("produits")
        .select("id, titre, description, prix, image_url")
        .order("id", { ascending: true });
      if (error) setError(error.message);
      setData(data ?? []);
      setLoading(false);
    })();
  }, [items]);

  if (loading) return <div style={{ padding:16, color:"#94a3b8" }}>Chargement…</div>;
  if (error)   return <div style={{ padding:16, color:"#f87171" }}>Erreur : {error}</div>;
  if (!data.length) return <div style={{ padding:16, color:"#94a3b8" }}>Aucun produit.</div>;

  return (
    <div className="nsg-liste-product" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(280px,1fr))", gap:16 }}>
      {data.map(p => (
        <ProduitCard key={p.id} produit={p} />
      ))}
    </div>
  );
}
