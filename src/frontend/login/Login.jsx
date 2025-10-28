import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    const fd = new FormData(e.target);
    const { email, password } = Object.fromEntries(fd.entries());

    try {
      const result = await login(email, password);
      const role = result?.role ?? "client";
      if (role === "md") navigate("/md");
      else if (role === "pharmacist") navigate("/pharmacist");
      else navigate("/pharmacie"); // client par défaut
    } catch (err) {
      setErrorMsg(err?.message || "Connexion échouée");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2>Bienvenue</h2>

      <div className="control">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required />
      </div>

      <div className="control">
        <label htmlFor="password">Mot de passe</label>
        <input id="password" name="password" type="password" required />
      </div>

      {errorMsg && <div className="control-error">{errorMsg}</div>}

      <p className="form-actions">
        <Link to="/signup">
          <button type="button" className="button button-flat">Créer un compte</button>
        </Link>
        <button type="submit" className="button" disabled={loading}>
          {loading ? "Connexion..." : "Connexion"}
        </button>
      </p>
    </form>
  );
}
