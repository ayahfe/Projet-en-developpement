import { use, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import {AuthProvider} from "./frontend/AuthContext";
import RootLayout from "./frontend/rootLayout/RootLayout"
import Login from "./frontend/login/Login"
import Signup from "./frontend/signup/Signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout/>,
    children:[
      {path: "login", element: <Login/>},
      {path: "signup", element: <Signup/>},
    ],
  },
]);

const App = () => {
  return(
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  );
};

export default App;