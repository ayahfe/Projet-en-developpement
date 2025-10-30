import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider, useNavigate } from "react-router-dom";

import RootLayout from "./frontend/rootLayout/RootLayout.jsx";
import Home from "./frontend/home/Home.jsx";
import Login from "./frontend/login/Login.jsx";
import Signup from "./frontend/signup/Signup.jsx";
import LoginRequired from "./frontend/RequiredAuth.jsx";
import { useAuth } from "./frontend/AuthContext.jsx";

import ProduitsAdmin from "./frontend/produits/ProduitsAdmin.jsx";
import ProduitForm   from "./frontend/produits/ProduitForm.jsx";

function RequireAuth({ children }) {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) return <LoginRequired />;
  return children;
}
function RequireRole({ allow = [], children }) {
  const { role } = useAuth();
  if (!allow.includes(role)) {
    return <div style={{ padding: 24 }}>Accès restreint.</div>;
  }
  return children;
}
function AuthCallback() {
  const navigate = useNavigate();
  useEffect(() => { navigate("/profil", { replace: true }); }, [navigate]);
  return <div style={{ padding: 24 }}>Connexion validée…</div>;
}
const RendezVous = () => <div style={{ padding: 16 }}>Page Rendez-Vous</div>;
const Profil     = () => <div style={{ padding: 16 }}>Mon Compte</div>;
function NotFound(){ return <div style={{ padding:24 }}>404 — Page introuvable</div>; }

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "auth/callback", element: <AuthCallback /> },

      { path: "rendezvous", element: <RequireAuth><RendezVous/></RequireAuth> },
      { path: "profil",     element: <RequireAuth><Profil/></RequireAuth> },

      { path: "client", element:
        <RequireAuth><RequireRole allow={["client"]}><Home/></RequireRole></RequireAuth>
      },
      { path: "client/rendezvous", element:
        <RequireAuth><RequireRole allow={["client"]}><RendezVous/></RequireRole></RequireAuth>
      },

      { path: "medecin", element:
        <RequireAuth><RequireRole allow={["medecin"]}><ProduitsAdmin/></RequireRole></RequireAuth>
      },
      { path: "medecin/produits", element:
        <RequireAuth><RequireRole allow={["medecin"]}><ProduitsAdmin/></RequireRole></RequireAuth>
      },
      { path: "medecin/produits/nouveau", element:
        <RequireAuth><RequireRole allow={["medecin"]}><ProduitForm/></RequireRole></RequireAuth>
      },
      { path: "medecin/produits/:id/editer", element:
        <RequireAuth><RequireRole allow={["medecin"]}><ProduitForm/></RequireRole></RequireAuth>
      },
      { path: "medecin/rendezvous", element:
        <RequireAuth><RequireRole allow={["medecin"]}><RendezVous/></RequireRole></RequireAuth>
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
