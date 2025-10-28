// src/frontend/navbar/Navbar.jsx
import React, { useState } from "react";
import "./Navbar.css";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const links = [
    { name: "Accueil", path: "/" },
    { name: "Médecins", path: "/medecins" },
    { name: "Rendez-Vous", path: "/rendezvous" },
    { name: "Ordonnances", path: "/ordonnances" },
    { name: "Pharmacie", path: "/pharmacie" },
    { name: "Mes Commandes", path: "/commandes" },
    { name: "Mon Compte", path: "/profil" },
  ];

  return (
    <header className="navbar-modern">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="brand">Med</span>
          <span className="brand-alt">Pharma</span>
        </Link>

        <nav className="navbar-links">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`navlink ${location.pathname === link.path ? "active" : ""}`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="auth-actions">
          <Link to="/login" className="button button-flat">Se connecter</Link>
          <Link to="/signup" className="button button-primary">Créer un compte</Link>
        </div>

        <button className="burger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      {isMenuOpen && (
        <div className="mobile-menu">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className={`mobile-item ${location.pathname === link.path ? "active" : ""}`}
            >
              {link.name}
            </Link>
          ))}
          <div className="mobile-auth">
            <Link to="/login" className="mobile-item">Se connecter</Link>
            <Link to="/signup" className="mobile-item">Créer un compte</Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
