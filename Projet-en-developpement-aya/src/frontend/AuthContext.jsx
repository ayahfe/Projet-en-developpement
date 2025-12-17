import { createContext, useCallback, useEffect, useState, useContext } from "react";

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

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
}
