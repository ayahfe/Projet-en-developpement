import { useContext } from "react";
import { AuthContext } from "../AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header>
      <h1 onClick={() => navigate("/")} className="clickable-title">
        PharmaPlus
      </h1>

      <nav>
        <ul>
          <li>
            <button onClick={() => navigate("/")}>Accueil</button>
          </li>

          {!isLoggedIn ? (
            <li>
              {location.pathname === "/login" ? (
                <span>Déjà sur Connexion</span> 
              ) : (
                <button onClick={() => navigate("/login")}>Connexion</button>
              )}
            </li>
          ) : (
            <li>
              <button onClick={logout}>Déconnexion</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
