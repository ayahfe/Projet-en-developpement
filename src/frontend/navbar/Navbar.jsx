







import React, { useState } from "react";
import "./Navbar.css";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();




import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { useCart } from "../cart/CartContext"; // ✅ ajout du panier
import "./Navbar.css";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cart } = useCart() || { cart: [] }; // ✅ gestion sécurisée
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ effet scroll
  useEffect(() => {
    const nav = document.querySelector(".navbar-modern");
    if (!nav) return;

    const handleScroll = () => {
      if (window.scrollY > 10) nav.classList.add("scrolled");
      else nav.classList.remove("scrolled");
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);







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




    
  ];

  async function handleLogout() {
    try {
      await logout();
      navigate("/");
    } catch (e) {
      alert(e.message || "Impossible de se déconnecter");
    }
  }

  return (
    <header className="navbar-modern">
      <div className="navbar-container">
        {/* Logo */}






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




        {/* Liens centraux */}
        <nav className="navbar-links">
          {links.map((l) => (
            <Link
              key={l.path}
              to={l.path}
              className={`navlink ${
                location.pathname === l.path ? "active" : ""
              }`}
            >
              {l.name}






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




        {/* Actions à droite */}
        <div className="navbar-actions">
          {/* 🛒 Bouton Panier */}
          <Link to="/cart" className="cart-btn">
            🛒
            {cart.length > 0 && (
              <span className="cart-count">{cart.length}</span>
            )}
          </Link>

          {user ? (
            <button className="logout-btn" onClick={handleLogout}>
              Déconnexion
            </button>
          ) : (
            <>
              <Link to="/login" className="navlink btn-login">
                Se connecter
              </Link>
              <Link to="/signup" className="btn-primary-nav">
                Créer un compte
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}






