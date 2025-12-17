import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import "./Login.css";

export default function Login() {
  const [values, setValues] = useState({ email: "", password: "" });
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!values.email || !values.password) {
      setError("Veuillez entrer vos identifiants");
      return;
    }
    
    try {
      setPending(true);
      await login(values.email, values.password);
      navigate("/");
    } catch (err) {
      setError(err.message || "Connexion échouée. Vérifiez vos identifiants.");
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="auth-screen">
      <form onSubmit={handleSubmit} className="auth-card">
        <h2>Connexion</h2>
        <p>Identifiez-vous pour accéder à votre espace</p>

        {error && (
          <div className="control-error">
            ⚠️ {error}
          </div>
        )}

        <div className="control">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={values.email}
            onChange={(e) => setValues({...values, email: e.target.value})}
            placeholder="votre@email.com"
            required
            disabled={pending}
          />
        </div>

        <div className="control">
          <label htmlFor="password">Mot de passe</label>
          <input
            id="password"
            name="password"
            type="password"
            value={values.password}
            onChange={(e) => setValues({...values, password: e.target.value})}
            placeholder="••••••••"
            required
            disabled={pending}
          />
        </div>

        <div className="form-actions">
          <Link to="/signup">
            <button className="button button-flat" type="button" disabled={pending}>
              Créer un compte
            </button>
          </Link>
          <button className="button" type="submit" disabled={pending}>
            {pending ? "Connexion..." : "Se connecter"}
          </button>
        </div>
      </form>
    </div>
  );
}