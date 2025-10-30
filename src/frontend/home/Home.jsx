// src/frontend/home/Home.jsx
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function Home() {
  const [items, setItems]   = useState([]);
  const [loading, setLoad]  = useState(true);
  const [err, setErr]       = useState("");

  useEffect(() => {
    (async () => {
      setLoad(true);
      setErr("");
      const { data, error } = await supabase.from("produits").select("*").order("id");
      if (error) { setErr(error.message); setLoad(false); return; }
      setItems(data || []);
      setLoad(false);
    })();
  }, []);

  return (
    <div className="home">
      <h1>🏠 Accueil — Nos Produits</h1>
      {loading && <p>Chargement…</p>}
      {err && <p className="error">{err}</p>}
      {!loading && !err && items.length === 0 && <p>Aucun produit pour le moment.</p>}
      <ul className="grid">
        {items.map(p => (
          <li key={p.id} className="card">
            <h3>{p.titre}</h3>
            <p>{p.description}</p>
            <strong>{Number(p.prix).toFixed(2)} $</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}
