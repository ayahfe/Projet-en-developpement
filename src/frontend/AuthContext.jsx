<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import { createContext, useCallback, useEffect, useState, useContext } from "react";
=======
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabaseClient"; // adapte le chemin si besoin
>>>>>>> af96563 ([Add] Addition des fichiers Cart.jsx, CartContext et Cart.css et stripe.js)
=======
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabaseClient"; // adapte le chemin si besoin
>>>>>>> origin/temp-visualiser-fix
=======
import { createContext, useCallback, useEffect, useState, useContext } from "react";
>>>>>>> 9965a5d (feat(auth): rajout test cypress)

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 9965a5d (feat(auth): rajout test cypress)
const API = "http://localhost:4000/api";

const getToken = () => localStorage.getItem("token");
const authHeader = () => {
  const t = getToken();
  return t ? { Authorization: `Bearer ${t}` } : {};
};

async function getJSON(path) {
  const r = await fetch(API + path, { headers: { ...authHeader() } });
  const data = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(data.error || `Erreur ${r.status}`);
  return data;
}

async function postJSON(path, body, { withAuth = true } = {}) {
  const headers = { "Content-Type": "application/json", ...(withAuth ? authHeader() : {}) };
  const r = await fetch(API + path, { method: "POST", headers, body: JSON.stringify(body ?? {}) });
  const data = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(data.error || `Erreur ${r.status}`);
  return data;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // me si token présent
  useEffect(() => {
    (async () => {
      try {
        if (getToken()) setUser(await getJSON("/auth/me"));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const signup = useCallback(async (email, password) => {
    const { token, user } = await postJSON("/auth/signup", { email, password }, { withAuth: false });
    localStorage.setItem("token", token);
    setUser(user);
  }, []);

  const login = useCallback(async (email, password) => {
    const { token, user } = await postJSON("/auth/login", { email, password }, { withAuth: false });
    localStorage.setItem("token", token);
    setUser(user);
  }, []);

  const logout = useCallback(async () => {
    try { await postJSON("/auth/logout", {}); } catch {}
    localStorage.removeItem("token");
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      isLoggedIn: !!user,
      email: user?.email ?? null,
      loading,
      signup, login, logout
    }}>
      {children}
    </AuthContext.Provider>
  );
<<<<<<< HEAD
=======
=======
>>>>>>> origin/temp-visualiser-fix
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    let ignore = false;
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (!ignore) {
        setUser(data?.session?.user ?? null);
        setInitializing(false);
      }
    })();
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => {
      ignore = true;
      sub?.subscription?.unsubscribe();
    };
  }, []);

  async function login(email, password) {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  }

  async function signup(email, password) {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
  }

  async function logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }

  const value = useMemo(() => ({
    user, initializing, login, signup, logout
  }), [user, initializing]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
<<<<<<< HEAD
>>>>>>> af96563 ([Add] Addition des fichiers Cart.jsx, CartContext et Cart.css et stripe.js)
=======
>>>>>>> origin/temp-visualiser-fix
=======
>>>>>>> 9965a5d (feat(auth): rajout test cypress)
}
