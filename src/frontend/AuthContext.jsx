import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supaBaseClient";

const AuthContext = createContext();

async function ensureProfile(uid, email, defaultRole = "client") {
  // Lire profil (RLS : auth.uid() = id → OK après login)
  const { data: prof, error } = await supabase
    .from("profiles")
    .select("id, role, email")
    .eq("id", uid)
    .maybeSingle();
  if (error && error.code !== "PGRST116") throw error;

  // Créer si absent
  if (!prof) {
    const { data, error: upErr } = await supabase
      .from("profiles")
      .upsert({ id: uid, email, role: defaultRole }, { onConflict: "id" })
      .select()
      .single();
    if (upErr) throw upErr;
    return data;
  }

  // Compléter le rôle s'il est vide
  if (!prof.role) {
    const { data, error: upErr } = await supabase
      .from("profiles")
      .update({ role: defaultRole })
      .eq("id", uid)
      .select()
      .single();
    if (upErr) throw upErr;
    return data;
  }
  return prof;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);

      // 1) Gestion du retour de lien d’email/magic link → créer une vraie session
      try {
        const url = new URL(window.location.href);
        if (url.searchParams.get("code") || window.location.hash.includes("access_token")) {
          await supabase.auth.exchangeCodeForSession(window.location.href);
          // Nettoyage d’URL pour éviter de relancer l’échange à chaque refresh
          window.history.replaceState({}, "", url.pathname + url.search.split("?code")[0]);
        }
      } catch (e) {
        console.warn("exchangeCodeForSession:", e?.message);
      }

      // 2) Récupérer la session existante si déjà connecté
      const { data: { user: u } } = await supabase.auth.getUser();
      if (u) {
        setUser(u);
        const { data: p } = await supabase
          .from("profiles")
          .select("role, email")
          .eq("id", u.id)
          .maybeSingle();
        setRole(p?.role ?? null);
      }

      // 3) Écouter les évènements d’auth (et créer le profil au premier SIGNED_IN)
      const { data: sub } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (event === "SIGNED_IN" && session?.user) {
          const u2 = session.user;
          setUser(u2);
          const preferred = localStorage.getItem("pharmaplus-role-pref") || "client";
          try {
            const prof = await ensureProfile(u2.id, u2.email, preferred);
            setRole(prof?.role ?? "client");
          } catch (e) {
            console.error("ensureProfile error:", e?.message);
          }
        }
        if (event === "SIGNED_OUT") {
          setUser(null);
          setRole(null);
        }
      });

      setLoading(false);
      return () => sub?.subscription?.unsubscribe?.();
    })();
  }, []);

  // ---- API publique du contexte ----
  async function login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;

    const u = data.user;
    setUser(u);
    // On peut maintenant créer/assurer le profil (RLS OK)
    const preferred = localStorage.getItem("pharmaplus-role-pref") || "client";
    const prof = await ensureProfile(u.id, email, preferred);
    setRole(prof?.role ?? "client");

    return { user: u, role: prof?.role ?? "client" };
  }

  async function signup(email, password, userRole = "client") {
    // Avec confirmation email activée, signUp ne crée PAS de session
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      // Redirige le lien d'email vers /login (ou /auth/callback si tu préfères)
      options: { emailRedirectTo: `${window.location.origin}/login` },
    });
    if (error) throw error;

    // Ne PAS écrire dans profiles ici (pas de session → RLS bloque)
    // On mémorise juste le rôle choisi pour le premier SIGNED_IN
    localStorage.setItem("pharmaplus-role-pref", userRole);

    return { user: data.user, role: userRole };
  }

  async function logout() {
    await supabase.auth.signOut();
    setUser(null);
    setRole(null);
  }

  return (
    <AuthContext.Provider value={{ user, role, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
