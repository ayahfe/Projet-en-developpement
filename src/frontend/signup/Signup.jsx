// src/frontend/signup/Signup.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import "./Signup.css";

export default function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [role, setRole] = useState("client");
  const [passwordAreNotEqual, setPasswordAreNotEqual] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setErrorMsg("");

    const fd = new FormData(event.target);
    const form = Object.fromEntries(fd.entries());

    if (form.password !== form["confirm-password"]) {
      setPasswordAreNotEqual(true);
      return;
    }
    setPasswordAreNotEqual(false);
    setLoading(true);

    try {
      await signup(form.email, form.password, role);
      navigate("/login");
      event.target.reset();
    } catch (err) {
      setErrorMsg(err?.message || "Erreur lors de l'inscription");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="signup-form">
      <h2>Créer un compte</h2>
      <p>Inscrivez-vous pour accéder à l'Espace clinique/pharmacie</p>

      <div className="control">
        <label htmlFor="email">Email</label>
        <input id="email" type="email" name="email" required />
      </div>

      <div className="control">
        <label htmlFor="role">Vous êtes</label>
        <select
          id="role"
          name="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="md">MD (Médecin)</option>
          <option value="pharmacist">Pharmacien</option>
          <option value="client">Client</option>
        </select>
      </div>

      <div className="control">
        <label htmlFor="password">Mot de passe</label>
        <input id="password" type="password" name="password" required />
      </div>

      <div className="control">
        <label htmlFor="confirm-password">Confirmez le mot de passe</label>
        <input
          id="confirm-password"
          type="password"
          name="confirm-password"
          required
        />
        {passwordAreNotEqual && (
          <div className="control-error">
            Les mots de passe doivent correspondre
          </div>
        )}
      </div>

      {errorMsg && (
        <div className="control-error">
          <p>{errorMsg}</p>
        </div>
      )}

      <hr />

      <div className="control checkbox-control">
        <label htmlFor="terms-and-conditions">
          <input type="checkbox" id="terms-and-conditions" name="terms" required />
          J'accepte les conditions d'utilisation
        </label>
      </div>

      <p className="form-actions">
        <Link to="/login">
          <button type="button" className="button button-flat">Se connecter</button>
        </Link>
        <button type="submit" className="button" disabled={loading}>
          {loading ? "Création..." : "Créer un compte"}
        </button>
      </p>
    </form>
  );
}
