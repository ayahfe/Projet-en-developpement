// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./frontend/navbar/Navbar.jsx";
import RootLayout from "./frontend/rootLayout/RootLayout.jsx";
import Home from "./frontend/home/home.jsx"; 
import Pharmacie from "./frontend/home/Pharmacie.jsx"; // nouvelle page produits
import Login from "./frontend/login/Login.jsx";
import Signup from "./frontend/signup/Signup.jsx";
import AddPrescription from "./frontend/addPrescription/AddPrescription.jsx";

export default function App() {
  return (
    <Router>
      <Navbar />
      <main className="app">
        <Routes>
          {/* Routes affichées AVEC la navbar */}
          <Route element={<RootLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/ordonnances/ajouter" element={<AddPrescription />} />
          </Route>

          {/* Routes sans navbar (connexion / inscription) */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/pharmacie" element={<Pharmacie />} />

          {/* Fallback pour les routes inconnues */}
          <Route path="*" element={<div style={{ padding: 24 }}>404 — Page non trouvée</div>} />
        </Routes>
      </main>
    </Router>
  );
}
