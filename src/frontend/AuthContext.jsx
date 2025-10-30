import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

// ---- garantit qu'un profil existe et que 'role' est défini ----
async function ensureProfile(uid, email, defaultRole = "client") {
  if (!uid) return null;

  // 1) Lire
  const { data: prof, error } = await supabase
    .from("profiles")
    .select("id, email, role")
    .eq("id", uid)
    .maybeSingle();
  if (error) throw error;

  // 2) Créer si manquant
  if (!prof) {
    const { error: upErr } = await supabase
      .from("profiles")
      .upsert({ id: uid, email, role: defaultRole }, { onConflict: "id" });
    if (upErr) throw upErr;
  } else if (!prof.role) {
    // 3) Fixer role si null/vide
    const { error: fixErr } = await supabase
      .from("profiles")
      .update({ role: defaultRole })
      .eq("id", uid);
    if (fixErr) throw fixErr;
  }

  // 4) Re-lire pour retourner l'état final
  const { data: finalProf, error: reSelErr } = await supabase
    .from("profiles")
    .select("id, email, role")
    .eq("id", uid)
    .single();
  if (reSelErr) throw reSelErr;

  // >>> LOG DEBUG
  console.log("[AUTH] PROFILE final =>", finalProf);

  return finalProf;
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [user, setUser]       = useState(null);
  const [role, setRole]       = useState("");
  const [loading, setLoading] = useState(true);   // charge la session
  const [ready, setReady]     = useState(false);  // session + profil lus

  // Charger session au démarrage
  useEffect(() => {
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session ?? null);
      setUser(session?.user ?? null);
      setLoading(false);
    })();

    const { data: sub } = supabase.auth.onAuthStateChange((_evt, newSession) => {
      setSession(newSession ?? null);
      setUser(newSession?.user ?? null);
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  // Lire / créer profil quand l'user change
  useEffect(() => {
    (async () => {
      if (!user?.id) { setRole(""); setReady(true); return; }
      try {
        const pr = await ensureProfile(user.id, user.email, "client");
        setRole(pr?.role || "");
        // >>> LOG DEBUG
        console.log("[AUTH] role set to =>", pr?.role || "");
      } catch (e) {
        console.warn("ensureProfile error:", e);
        setRole("");
      } finally {
        setReady(true);
      }
    })();
  }, [user?.id]);

  // Expose un helper manuel si besoin
  async function refreshProfile() {
    if (!user?.id) return null;
    const pr = await ensureProfile(user.id, user.email, "client");
    setRole(pr?.role || "");
    return pr;
  }

  // Actions
  async function signIn(email, password) {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    // onAuthStateChange s'occupera du profil
  }

  async function signUp(email, password, desiredRole = "client") {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;

    // Si Supabase renvoie déjà un user (email confirmation OFF),
    // on tente de créer le profil tout de suite.
    const uid = data?.user?.id;
    if (uid) {
      try {
        const pr = await ensureProfile(uid, email, desiredRole);
        setRole(pr?.role || "");
      } catch (e) {
        console.warn("ensureProfile after signUp:", e);
      }
    }
    return data;
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setRole("");
  }

  const value = useMemo(() => ({
    session,
    user,
    role,
    loading,   // charge la session
    ready,     // prêt pour afficher UI (session + profil traités)
    isLoggedIn: !!user,
    signIn,
    signUp,
    signOut,
    refreshProfile,
  }), [session, user, role, loading, ready]);

  // Debug bandeau console à chaque rendu valeur
  useEffect(() => {
    console.log(`DEBUG — loggedIn: ${!!user} · role: ${role || "—"} · user: ${user?.email || "—"}`);
  }, [user, role]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
