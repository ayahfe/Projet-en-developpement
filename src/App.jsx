





// src/App.jsx

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./frontend/AuthContext";
import RootLayout from "./frontend/rootLayout/RootLayout";
import Login from "./frontend/login/Login";
import Signup from "./frontend/signup/Signup";
import ProduitList from "./frontend/produitCard/ProduitCard.jsx";




import RendezVous from "./frontend/rdv/rdv.jsx"; // 


import ShowPrescription from "./frontend/prescription/showPrescription/ShowPrescription.jsx";
import AddPrescription from "./frontend/prescription/addPrescription/AddPrescription.jsx";
import ModifyPrescription from "./frontend/prescription/modifyPrescription/ModifyPrescription.jsx";
import DeletePrescription from "./frontend/prescription/deletePrescription/DeletePrescription.jsx";
import PharmacienHome from "./frontend/roles/PharmacienHome.jsx";
import MedecinHome from "./frontend/roles/MedecinHome.jsx";
import CalendrierRdv from "./frontend/rdv/rdv.jsx";
import { CartProvider } from "./frontend/cart/CartContext.jsx";
import Cart from "./frontend/cart/Cart";





import ModifyPrescription from "./frontend/prescription/modifyPrescription/ModifyPrescription.jsx";
import DeletePrescription from "./frontend/prescription/deletePrescription/DeletePrescription.jsx";
import ShowPrescriptionList from "./frontend/prescription/showPrescription/ShowPrescription.jsx";





const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,




    children: [
      { index: true, element: <ProduitList /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "rendezvous", element: <RendezVous /> },


    errorElement: (
      <div style={{ padding: 40, textAlign: "center" }}>
        <h2>❌ Page introuvable</h2>
        <p>La page demandée n'existe pas.</p>
      </div>
    ),
    children: [
      // ✅ Accueil = Boutique
      { index: true, element: <ProduitList /> },

      // 🧺 Panier
      { path: "cart", element: <Cart /> },

      // 👤 Authentification
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },

      // 👨‍⚕️ Rôles
      { path: "pharmacien", element: <PharmacienHome /> },
      { path: "medecin", element: <MedecinHome /> },

      // 📅 Rendez-vous
      { path: "rendezvous", element: <CalendrierRdv /> },

      // 💊 Prescriptions
      { path: "medecins", element: <ShowPrescription /> },
      { path: "medecins/add", element: <AddPrescription /> },
      { path: "medecins/modify", element: <ModifyPrescription /> },
      { path: "medecins/delete", element: <DeletePrescription /> },





    children: [
      { index: true, element: <ProduitList /> },   // <-- page d’accueil
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "/medecins", element: <ShowPrescriptionList /> },
      { path: "/medecins/add", element: <AddPrescription /> },
      { path: "/medecins/modify/:id", element: <ModifyPrescription /> },
      { path: "/medecins/delete", element: <DeletePrescription /> },




    ],
  },
]);

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}