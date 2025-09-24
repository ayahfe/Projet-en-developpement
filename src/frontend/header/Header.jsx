import { useContext } from "react";
import { AuthContext } from "../AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import "./Header.css"; // <-- fichier CSS stylisé

const Header = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className="header">
      <h1 onClick={() => navigate("/")} className="logo">
        PharmaPlus
      </h1>

      <nav className="nav">
        {!isLoggedIn ? (
          <>
            <button
              className={`nav-btn ${location.pathname === "/" ? "active" : ""}`}
              onClick={() => navigate("/")}
            >
              Accueil
            </button>
            {location.pathname !== "/login" && (
              <button
                className={`nav-btn ${
                  location.pathname === "/login" ? "active" : ""
                }`}
                onClick={() => navigate("/login")}
              >
                Connexion
              </button>
            )}
          </>
        ) : (
          <>
            <button
              className={`nav-btn ${location.pathname === "/" ? "active" : ""}`}
              onClick={() => navigate("/")}
            >
              Accueil
            </button>
            <button className="nav-btn logout" onClick={logout}>
              Déconnexion
            </button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
