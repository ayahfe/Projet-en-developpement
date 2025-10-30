// src/frontend/login/Login.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { supabase } from "../../lib/supabaseClient";
import "./Login.css";

export default function Login() {
  const [values, setValues] = useState({ email: "", password: "" });
  const [pending, setPending] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const onChange = (k, v) => setValues(p => ({ ...p, [k]: v }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!values.email || !values.password) return alert("Veuillez entrer vos identifiants");
    try {
      setPending(true);
      await login(values.email, values.password);

      // récupère le rôle et redirige
      const { data: { user } } = await supabase.auth.getUser();
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      const role = profile?.role || "client";
      navigate(`/${role}`);
    } catch (err) {
      alert(err.message || "Connexion échouée");
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="auth-screen">
      <form onSubmit={onSubmit} className="auth-card appear">
        <h2>Connexion</h2>
        <p>Identifiez-vous pour accéder à votre espace</p>

        <div className="control">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={values.email}
            onChange={e=>onChange("email", e.target.value)}
            required
          />
        </div>

        <div className="control">
          <label htmlFor="password">Mot de passe</label>
          <input
            id="password"
            type="password"
            value={values.password}
            onChange={e=>onChange("password", e.target.value)}
            required
          />
        </div>

        <p className="form-actions">
          <Link to="/signup"><button className="button button-flat" type="button">Créer un compte</button></Link>
          <button className="button" type="submit" disabled={pending}>
            {pending ? "Connexion..." : "Se connecter"}
          </button>
        </p>
      </form>
    </div>
  );
}
