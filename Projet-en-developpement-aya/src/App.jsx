import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense, lazy } from 'react';
import "./App.css";
import { AuthProvider } from "./frontend/AuthContext";
import RootLayout from "./frontend/rootLayout/RootLayout";

// Standard import for the home page (LCP optimization)
import ProduitList from "./frontend/produitCard/ProduitCard.jsx";

// Lazy load everything else
const Login = lazy(() => import("./frontend/login/Login"));
const Signup = lazy(() => import("./frontend/signup/Signup"));
const PrescriptionManager = lazy(() => import("./frontend/prescription/PrescriptionManager.jsx"));
const ShowPrescriptionList = lazy(() => import("./frontend/prescription/showPrescription/ShowPrescription.jsx"));
const AddPrescription = lazy(() => import("./frontend/prescription/addPrescription/AddPrescription.jsx"));
const ModifyPrescription = lazy(() => import("./frontend/prescription/modifyPrescription/ModifyPrescription.jsx"));
const DeletePrescription = lazy(() => import("./frontend/prescription/deletePrescription/DeletePrescription.jsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <ProduitList /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      {
        path: "/medecins",
        element: <PrescriptionManager />,
        children: [
          { index: true, element: <ShowPrescriptionList /> },
          { path: "add", element: <AddPrescription /> },
          { path: "modify/:id", element: <ModifyPrescription /> },
          { path: "delete", element: <DeletePrescription /> },
        ],
      },
    ],
  },
]);

export default function App() {
  return (
    <AuthProvider>
      {/* Suspense handles the loading state for lazy routes */}
      <Suspense fallback={<div className="loading-spinner">Chargement...</div>}>
        <RouterProvider router={router} />
      </Suspense>
    </AuthProvider>
  );
}