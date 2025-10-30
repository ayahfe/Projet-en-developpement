// src/frontend/navbar/Navbar.jsx
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import "./Navbar.css";

export default function Navbar() {
  const { isLoggedIn, loading, signOut, user } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

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
        <Link to="/" className="navbar-logo" onClick={() => setOpen(false)}>
          <span className="brand">Med</span><span className="brand-alt">Pharma</span>
        </Link>

        <nav className="navbar-links">
          {links.map(l => (
            <NavLink key={l.path} to={l.path} className={({isActive}) => "navlink" + (isActive ? " active" : "")}>
              {l.name}
            </NavLink>
          ))}
        </nav>

        <div className="navbar-actions">
          {loading ? (
            <span className="auth-loading">…</span>
          ) : isLoggedIn ? (
            <>
              <span className="hello">{user?.email}</span>
              <button
                className="logout-btn"
                onClick={async () => { await signOut(); setOpen(false); navigate("/"); }}
              >
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link className="auth-link" to="/login">Connexion</Link>
              <Link className="auth-link" to="/signup">Créer un compte</Link>
            </>
          )}
        </div>

        <button className="burger" onClick={() => setOpen(v => !v)} aria-label="Menu">☰</button>
      </div>

      <div className={"mobile-menu" + (open ? " open" : "")}>
        {links.map(l => (
          <NavLink key={l.path} to={l.path} className="mobile-item" onClick={() => setOpen(false)}>
            {l.name}
          </NavLink>
        ))}
        <div className="mobile-auth">
          {loading ? (
            <span className="auth-loading">…</span>
          ) : isLoggedIn ? (
            <button
              className="logout-btn"
              onClick={async () => { await signOut(); setOpen(false); navigate("/"); }}
            >
              Déconnexion
            </button>
          ) : (
            <>
              <Link className="auth-link" to="/login" onClick={() => setOpen(false)}>Connexion</Link>
              <Link className="auth-link" to="/signup" onClick={() => setOpen(false)}>Créer un compte</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
