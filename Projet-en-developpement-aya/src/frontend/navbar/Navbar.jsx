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
        {/* Logo à gauche */}
        <Link to="/" className="navbar-logo">
          <span className="brand">Med</span>
          <span className="brand-alt">Pharma</span>
        </Link>

        {/* Liens au centre */}
        <nav className="navbar-links">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`navlink ${
                location.pathname === link.path ? "active" : ""
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Bouton à droite */}
        <button className="logout-btn">Déconnexion</button>

        {/* Menu mobile */}
        <button
          className="burger"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
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
              className={`mobile-item ${
                location.pathname === link.path ? "active" : ""
              }`}
            >
              {link.name}
            </Link>
          ))}
          <button className="logout-btn mobile">Déconnexion</button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
