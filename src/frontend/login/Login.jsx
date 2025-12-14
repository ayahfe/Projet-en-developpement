// src/frontend/login/Login.jsx
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
=======
=======
>>>>>>> origin/temp-visualiser-fix
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { supabase } from "../../lib/supabaseClient";
<<<<<<< HEAD
>>>>>>> af96563 ([Add] Addition des fichiers Cart.jsx, CartContext et Cart.css et stripe.js)
=======
>>>>>>> origin/temp-visualiser-fix
=======
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
>>>>>>> 9965a5d (feat(auth): rajout test cypress)
import "./Login.css";

export default function Login() {
  const [values, setValues] = useState({ email: "", password: "" });
  const [pending, setPending] = useState(false);
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  const { login } = useContext(AuthContext);
=======
  const { login } = useAuth();
>>>>>>> af96563 ([Add] Addition des fichiers Cart.jsx, CartContext et Cart.css et stripe.js)
=======
  const { login } = useAuth();
>>>>>>> origin/temp-visualiser-fix
=======
  const { login } = useContext(AuthContext);
>>>>>>> 9965a5d (feat(auth): rajout test cypress)
  const navigate = useNavigate();

  const onChange = (k, v) => setValues(p => ({ ...p, [k]: v }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!values.email || !values.password) return alert("Veuillez entrer vos identifiants");
    try {
      setPending(true);
      await login(values.email, values.password);
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
      navigate("/"); // redirection après succès
    } catch (err) {
      alert("Connexion échouée");
=======
=======
>>>>>>> origin/temp-visualiser-fix

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
<<<<<<< HEAD
>>>>>>> af96563 ([Add] Addition des fichiers Cart.jsx, CartContext et Cart.css et stripe.js)
=======
>>>>>>> origin/temp-visualiser-fix
=======
      navigate("/"); // redirection après succès
    } catch (err) {
      alert("Connexion échouée");
>>>>>>> 9965a5d (feat(auth): rajout test cypress)
    } finally {
      setPending(false);
    }
  };

  return (
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 9965a5d (feat(auth): rajout test cypress)
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
<<<<<<< HEAD
=======
=======
>>>>>>> origin/temp-visualiser-fix
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
<<<<<<< HEAD
>>>>>>> af96563 ([Add] Addition des fichiers Cart.jsx, CartContext et Cart.css et stripe.js)
=======
>>>>>>> origin/temp-visualiser-fix
=======
>>>>>>> 9965a5d (feat(auth): rajout test cypress)
  );
}
