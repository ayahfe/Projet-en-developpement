import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./frontend/AuthContext";
import RootLayout from "./frontend/rootLayout/RootLayout";
import Login from "./frontend/login/Login";
import Signup from "./frontend/signup/Signup";
import ProduitList from "./frontend/produitCard/ProduitCard.jsx";
import AddPrescription from "./frontend/prescription/addPrescription/AddPrescription.jsx";
import ModifyPrescription from "./frontend/prescription/modifyPrescription/ModifyPrescription.jsx";
import DeletePrescription from "./frontend/prescription/deletePrescription/DeletePrescription.jsx";
import ShowPrescriptionList from "./frontend/prescription/showPrescription/ShowPrescription.jsx";
import PrescriptionManager from "./frontend/prescription/PrescriptionManager.jsx";

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
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
