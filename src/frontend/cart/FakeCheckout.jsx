// FakeCheckout.jsx
import React, { useState } from "react";
import { useCart } from "./CartContext"; // adapte si ton hook s'appelle autrement
import "./fakeCheckout.css";

export default function FakeCheckout({ onClose }) {
  const { items, total, clearCart } = useCart();
  const [name, setName] = useState("");
  const [card, setCard] = useState(""); // UX only, not real card
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const simulatePayment = async () => {
    setError(null);
    if (!name.trim()) return setError("Nom du titulaire requis");
    if (!card.match(/^\d{12,19}$/)) return setError("Numéro de carte invalide (utilise uniquement des chiffres ici)");
    setProcessing(true);

    // Simulation: "tokenize" → "pay"
    await new Promise((r) => setTimeout(r, 1200)); // simulate tokenization
    // small validation "decline" simulation
    if (card.endsWith("0000")) {
      setProcessing(false);
      return setError("La carte a été refusée (test).");
    }

    await new Promise((r) => setTimeout(r, 900)); // simulate payment processing

    // success
    setProcessing(false);
    setSuccess({
      id: "FAKE_" + Math.random().toString(36).slice(2, 9).toUpperCase(),
      amount: total,
      buyer: name,
      itemsCount: items.length,
      date: new Date().toLocaleString(),
    });

    // clear cart after success
    clearCart();
  };

  if (success) {
    return (
      <div className="fake-modal">
        <h2>Paiement réussi 🎉</h2>
        <p>Référence : <strong>{success.id}</strong></p>
        <p>Montant : <strong>{success.amount.toFixed(2)} $</strong></p>
        <p>Nom : {success.buyer}</p>
        <p>Articles payés : {success.itemsCount}</p>
        <p style={{ marginTop: 12, color: "#4b5563" }}>{success.date}</p>
        <div style={{ marginTop: 18 }}>
          <button className="btn-primary" onClick={onClose}>Fermer</button>
        </div>
      </div>
    );
  }

  return (
    <div className="fake-modal">
      <h2>Paiement (mode test)</h2>

      <div className="checkout-summary">
        <div>{items.length} article(s)</div>
        <div className="checkout-total">{total.toFixed(2)} $</div>
      </div>

      <label className="label">Nom sur la carte</label>
      <input className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex : Aya Hafiane" />

      <label className="label">Numéro de carte (chiffres seulement)</label>
      <input className="input" value={card} onChange={(e) => setCard(e.target.value.replace(/\D/g, ""))} placeholder="4242424242424242 (test)" />

      <div className="muted">Astuce test : terminaisons spéciales — si le numéro se termine par <code>0000</code> il sera refusé (test).</div>

      {error && <div className="error">{error}</div>}

      <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
        <button className="btn-secondary" onClick={onClose} disabled={processing}>Annuler</button>
        <button className="btn-primary" onClick={simulatePayment} disabled={processing}>
          {processing ? "Traitement..." : `Payer ${total.toFixed(2)} $`}
        </button>
      </div>
    </div>
  );
}
