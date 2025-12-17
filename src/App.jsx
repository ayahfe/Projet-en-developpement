// src/App.jsx - COMPLETE FIXED VERSION
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./frontend/AuthContext";
import { CartProvider } from "./frontend/cart/CartContext.jsx";
import RootLayout from "./frontend/rootLayout/RootLayout";
import Login from "./frontend/login/Login";
import Signup from "./frontend/signup/Signup";
import ProduitList from "./frontend/produitCard/ProduitList.jsx";
import Cart from "./frontend/cart/Cart";
import RendezVous from "./frontend/rdv/rdv.jsx";
import ShowPrescriptionList from "./frontend/prescription/showPrescription/ShowPrescription.jsx";
import AddPrescription from "./frontend/prescription/addPrescription/AddPrescription.jsx";
import ModifyPrescription from "./frontend/prescription/modifyPrescription/ModifyPrescription.jsx";
import DeletePrescription from "./frontend/prescription/deletePrescription/DeletePrescription.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: (
      <div style={{ padding: 40, textAlign: "center", color: "white", background: "linear-gradient(135deg, #1e3c72, #2a5298)" }}>
        <h2>❌ Page introuvable</h2>
        <p>La page demandée n'existe pas.</p>
      </div>
    ),
    children: [
      // HOME & PRODUCTS (Cypress expects /pharmacie)
      { index: true, element: <ProduitList /> },
      { path: "pharmacie", element: <ProduitList /> },
      { path: "produits", element: <ProduitList /> },
      
      // CART
      { path: "cart", element: <Cart /> },
      
      // AUTH (Cypress expects these exact routes)
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      
      // APPOINTMENTS
      { path: "rendezvous", element: <RendezVous /> },
      
      // PRESCRIPTIONS (Cypress expects /ordonnances)
      { path: "medecins", element: <ShowPrescriptionList /> },
      { path: "ordonnances", element: <ShowPrescriptionList /> }, // For Cypress
      { path: "medecins/add", element: <AddPrescription /> },
      { path: "medecins/modify/:id", element: <ModifyPrescription /> },
      { path: "medecins/delete/:id", element: <DeletePrescription /> },
    ],
  },
]);

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
  );
}