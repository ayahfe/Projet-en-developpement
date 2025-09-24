import { useContext } from "react";
import { AuthContext } from "../AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className="header">
  <div className="header-container">
    <h1 onClick={() => navigate("/")} className="logo">PharmaPlus</h1>
    <nav className="nav">
      <button className={`nav-btn ${location.pathname === "/" ? "active" : ""}`} onClick={() => navigate("/")}>
        Accueil
      </button>
      {!isLoggedIn ? (
        location.pathname !== "/login" && (
          <button className={`nav-btn ${location.pathname === "/login" ? "active" : ""}`} onClick={() => navigate("/login")}>
            Connexion
          </button>
        )
      ) : (
        <button className="nav-btn logout" onClick={logout}>Déconnexion</button>
      )}
    </nav>
  </div>
</header>

  );
};

export default Header;
