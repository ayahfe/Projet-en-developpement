// src/main.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "./frontend/AuthContext.jsx";
import "./styles/theme.css";
import "./styles/app.css";

const el = document.getElementById("root");
const root = createRoot(el);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
