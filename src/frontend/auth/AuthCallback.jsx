// src/frontend/auth/AuthCallback.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";

export default function AuthCallback() {
  const navigate = useNavigate();
  const [msg, setMsg] = useState("Validation de votre e-mail…");

  useEffect(() => {
    (async () => {
      const { error } = await supabase.auth.exchangeCodeForSession({
        currentUrl: window.location.href, // lit les query params fournis par Supabase
      });
      if (error) {
        console.error(error);
        setMsg("Lien invalide ou expiré. Redirection vers la connexion…");
        setTimeout(() => navigate("/login"), 1200);
        return;
      }
      setMsg("Email confirmé ! Redirection…");
      setTimeout(() => navigate("/profil", { replace: true }), 800);
    })();
  }, [navigate]);

  return <div style={{ padding: 24 }}>{msg}</div>;
}
