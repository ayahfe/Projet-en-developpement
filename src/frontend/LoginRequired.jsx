import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function LoginRequired() {
  const from = useLocation().pathname;
  return (
    <div style={{ color: "#fff", padding: 24 }}>
      <h2>Veuillez vous connecter</h2>
      <p>Vous devez être connecté(e) pour afficher cette page.</p>
      <div style={{ display: "flex", gap: 12 }}>
        <Link to="/login" state={{ from }}>
          <button className="button">Connexion</button>
        </Link>
        <Link to="/signup" state={{ from }}>
          <button className="button button-flat">Créer un compte</button>
        </Link>
      </div>
    </div>
  );
}
