// src/frontend/header/Header.jsx
import { useContext } from "react";
import { AuthContext } from "../AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const loc = useLocation();

  const onLogout = async () => {
    try { await logout(); } finally { navigate("/login"); }
  };

  return (
    <header className="header">
      <div className="header-container">
        <h1 onClick={() => navigate("/")} className="logo">PharmaPlus</h1>
        <nav className="nav">
          <button className={`nav-btn ${loc.pathname === "/" ? "active" : ""}`} onClick={() => navigate("/")}>
            Accueil
          </button>
          {!isLoggedIn ? (
            <button className={`nav-btn ${loc.pathname === "/login" ? "active" : ""}`} onClick={() => navigate("/login")}>
              Connexion
            </button>
          ) : (
            <button className="nav-btn logout" onClick={onLogout}>Déconnexion</button>
          )}
        </nav>
      </div>
    </header>
  );
}
