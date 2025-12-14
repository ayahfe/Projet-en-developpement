// src/frontend/login/Login.jsx
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import "./Login.css";

export default function Login() {
  const [values, setValues] = useState({ email: "", password: "" });
  const [pending, setPending] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const onChange = (k, v) => setValues(p => ({ ...p, [k]: v }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!values.email || !values.password) return alert("Veuillez entrer vos identifiants");
    try {
      setPending(true);
      await login(values.email, values.password);
      navigate("/"); // redirection après succès
    } catch (err) {
      alert("Connexion échouée");
    } finally {
      setPending(false);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h2>Bienvenue</h2>
      <h3>Connectez-vous pour continuer</h3>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" value={values.email}
                 onChange={e=>onChange("email", e.target.value)} required />
        </div>
        <div className="control no-margin">
          <label htmlFor="password">Mot de passe</label>
          <input id="password" type="password" value={values.password}
                 onChange={e=>onChange("password", e.target.value)} required />
        </div>
      </div>

      <p className="form-actions">
        <Link to="/signup"><button className="button button-flat" type="button">Créer un compte</button></Link>
        <button className="button" type="submit" disabled={pending}>
          {pending ? "Connexion..." : "Se connecter"}
        </button>
      </p>
    </form>
  );
}
