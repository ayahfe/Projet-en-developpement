import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../AuthContext";
import "./Header.css";

export default function Header() {
  const { isLoggedIn, user, role, signOut, loading, ready } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const baseLinks = [{ name: "Accueil", path: "/" }];

  const roleLinks =
    role === "client"
      ? [...baseLinks, { name: "Rendez-Vous", path: "/client/rendezvous" }]
      : role === "medecin"
      ? [
          { name: "Produits (admin)", path: "/medecin/produits" },
          { name: "Rendez-Vous", path: "/medecin/rendezvous" },
        ]
      : role === "pharmacien"
      ? [
          { name: "Pharmacie", path: "/pharmacie" },
          { name: "Ordonnances", path: "/ordonnances" },
        ]
      : baseLinks;

  async function handleLogout() {
    try {
      await signOut();
      setOpen(false);
      navigate("/");
    } catch {
      alert("Erreur lors de la déconnexion");
    }
  }

  return (
    <header className="hdr">
      <div className="hdr-container">
        <Link to="/" className="hdr-logo" onClick={() => setOpen(false)}>
          <span className="brand-1">Med</span><span className="brand-2"> Pharma</span>
        </Link>

        <button className="hdr-burger" onClick={() => setOpen(o => !o)} aria-label="Menu">☰</button>

        <nav className={`hdr-nav ${open ? "open" : ""}`}>
          {roleLinks.map(l => (
            <NavLink key={l.path} to={l.path} onClick={() => setOpen(false)}>
              {l.name}
            </NavLink>
          ))}
          {isLoggedIn && (
            <NavLink to="/profil" onClick={() => setOpen(false)}>
              Mon Compte
            </NavLink>
          )}
        </nav>

        <div className="hdr-actions">
          {!ready || loading ? (
            <span className="hdr-hello">Chargement…</span>
          ) : isLoggedIn ? (
            <>
              <span className="hdr-hello">
                Bonjour, {user?.email} {role ? `· ${role}` : ""}
              </span>
              <button onClick={handleLogout} className="hdr-btn danger">Déconnexion</button>
            </>
          ) : (
            <>
              <Link to="/login" className="hdr-btn ghost">Connexion</Link>
              <Link to="/signup" className="hdr-btn primary">Créer un compte</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
