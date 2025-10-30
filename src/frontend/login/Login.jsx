// src/frontend/login/Login.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import "./Login.css";

export default function Login() {
  const { isLoggedIn, role, loading, signIn } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [pwd, setPwd]     = useState("");
  const [err, setErr]     = useState("");

  useEffect(() => {
    if (!loading && isLoggedIn) {
      if (role === "medecin") nav("/medecin/produits", { replace: true });
      else nav("/client", { replace: true });
    }
  }, [isLoggedIn, role, loading, nav]);

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    try {
      await signIn(email, pwd);
    } catch (e) {
      setErr(e.message || "Erreur de connexion");
    }
  }

  return (
    <div className="auth-card">
      <h1>Connexion</h1>
      <form onSubmit={onSubmit}>
        <label>Email</label>
        <input value={email} onChange={e=>setEmail(e.target.value)} type="email" required />
        <label>Mot de passe</label>
        <input value={pwd} onChange={e=>setPwd(e.target.value)} type="password" required />
        {err && <p className="error">{err}</p>}
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
}
