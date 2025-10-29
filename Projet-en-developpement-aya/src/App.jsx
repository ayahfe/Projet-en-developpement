import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./frontend/AuthContext";
import RootLayout from "./frontend/rootLayout/RootLayout";
import Login from "./frontend/login/Login";
import Signup from "./frontend/signup/Signup";
import ProduitList from "./frontend/produitCard/ProduitCard.jsx";
import AddPrescription from "./frontend/addPrescription/addPrescription.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <ProduitList /> },   // <-- page d’accueil
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "/medecins", element: <AddPrescription /> },
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