import { useState } from "react";








import {Link, useNavigate} from "react-router-dom";

export default function Signup(){
    const navigate = useNavigate();
    const [passwordAreNotEqual, setPasswordAreNotEqual] = useState(false);

    function handleSubmit(event){
        event.preventDefault();
        const fd = new FormData(event.target);
        const data = Object.fromEntries(fd.entries());
        
        if(data.password !== data["confirm-password"]){
            setPasswordAreNotEqual(true);
            return;
        }

        setPasswordAreNotEqual(false);

        alert("Compte créé avec succès!");
        navigate("/login")

        event.target.reset();
    }
    return(
        <form onSubmit={handleSubmit}>
            <h2>Créer un compte</h2>
            <p>Inscrivez-vous pour accéder à l'Espace clinique/pharmacie</p>

            <div className="control">
                <label htmlFor="email">Email</label>
                <input id="email" type="email" name="email" required/>
            </div>
            <div className="control">
                <label htmlFor="password">Mot de passe</label>
                <input id="password" type="password" name="password" required/>
            </div>
            <div className="control">
                <label htmlFor="confirm-password">Confirmez le mot de passe</label>
                <input
                    id="confirm-password"
                    type="password"
                    name="confirm-password"
                    required
                />
                {passwordAreNotEqual&&(
                    <div className="control-error">
                        <p>Les mots de passe doivent correspondre</p>
                    </div>
                )}
            </div>
            <hr/>
            <div className="control checkbox-control">
                <label htmlFor="terms-and-conditions">
                    <input
                    type="checkbox"
                    id="terms-and-conditions"
                    name="terms"
                    required
                    />
                    J'accepte les conditions d'utilisation
                </label>
            </div>
            <p className="form-actions">
                <Link to="/login">
                <button type="button" className="button button-flat">
                    Se connecter
                </button>
                </Link>
                <button type="submit" className="button">
                    Créer un compte
                </button>
            </p>
        </form>
    )


}

import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";

import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";

export default function Signup() {
  const navigate = useNavigate();
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [role, setRole] = useState("client");
  const [pending, setPending] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd.entries());

    if (data.password !== data["confirm-password"]) {
      setPasswordsMatch(false);
      return;
    }
    setPasswordsMatch(true);
    setPending(true);

    try {

      // 1) Création du compte
      const { data: signUpData, error: signUpErr } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });
      if (signUpErr) throw signUpErr;

      // 2) Sauvegarde du rôle
      const userId = signUpData.user?.id;
      if (userId) {
        await supabase
          .from("profiles")
          .upsert({ id: userId, email: data.email, role }, { onConflict: "id" });
      }

      alert("Compte créé avec succès !");
      navigate("/login");
    } catch (err) {
      alert(err.message || "Erreur lors de la création du compte");

      // 🔥 APPEL AU BACKEND NODE (PAS SUPABASE)
      const res = await fetch("http://localhost:4000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          role: role,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Erreur lors de la création du compte");
      }

      // Réponse OK
      alert("Compte créé avec succès !");
      navigate("/login");

    } catch (err) {
      alert(err.message);
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="auth-screen">
      <form onSubmit={handleSubmit} className="auth-card appear">
        <h2>Créer un compte</h2>
        <p>Inscrivez-vous pour accéder à l’Espace clinique/pharmacie</p>

        <div className="control">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </div>

        <div className="control">
          <label htmlFor="password">Mot de passe</label>
          <input id="password" type="password" name="password" required />
        </div>

        <div className="control">
          <label htmlFor="confirm-password">Confirmez le mot de passe</label>
          <input id="confirm-password" type="password" name="confirm-password" required />
          {!passwordsMatch && (
            <p className="control-error">Les mots de passe ne correspondent pas.</p>
          )}
        </div>


        {/* Choix du rôle (segmented control) */}

        <div className="control">
          <label>Je suis :</label>
          <div className="segmented" role="tablist" aria-label="Choix du rôle">
            <input
              type="radio"
              id="role-client"
              name="role"
              value="client"
              checked={role === "client"}
              onChange={(e) => setRole(e.target.value)}
            />
            <label htmlFor="role-client">Client</label>

            <input
              type="radio"
              id="role-pharmacien"
              name="role"
              value="pharmacien"
              checked={role === "pharmacien"}
              onChange={(e) => setRole(e.target.value)}
            />
            <label htmlFor="role-pharmacien">Pharmacien</label>

            <input
              type="radio"
              id="role-medecin"
              name="role"
              value="medecin"
              checked={role === "medecin"}
              onChange={(e) => setRole(e.target.value)}
            />
            <label htmlFor="role-medecin">Médecin</label>
          </div>
        </div>

        <hr />

        <div className="control checkbox-control">
          <label htmlFor="terms">
            <input type="checkbox" id="terms" name="terms" required />
            J’accepte les conditions d’utilisation
          </label>
        </div>

        <p className="form-actions">
          <Link to="/login">
            <button type="button" className="button button-flat">Se connecter</button>
          </Link>
          <button type="submit" className="button" disabled={pending}>
            {pending ? "Création..." : "Créer un compte"}
          </button>
        </p>
      </form>
    </div>
  );
}



}


}

