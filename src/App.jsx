<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
=======
=======
>>>>>>> aya
=======
>>>>>>> aya
import { use, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import {AuthProvider} from "./frontend/AuthContext";
import RootLayout from "./frontend/rootLayout/RootLayout"
import Login from "./frontend/login/Login"
import Signup from "./frontend/signup/Signup";
<<<<<<< HEAD
<<<<<<< HEAD
import ProduitList from './data/produitCard/ProduitCard';
=======
>>>>>>> aya
=======
>>>>>>> aya

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout/>,
    children:[
      {path: "login", element: <Login/>},
      {path: "signup", element: <Signup/>},
<<<<<<< HEAD
<<<<<<< HEAD
      
=======
>>>>>>> aya
=======
>>>>>>> aya
    ],
  },
]);

<<<<<<< HEAD
<<<<<<< HEAD
function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router}/>
      <div>
        <ProduitList />
      </div>
=======
=======
>>>>>>> aya
const App = () => {
  return(
    <AuthProvider>
      <RouterProvider router={router}/>
<<<<<<< HEAD
>>>>>>> aya
=======
>>>>>>> aya
    </AuthProvider>
  );
};

<<<<<<< HEAD
<<<<<<< HEAD
export default App;
>>>>>>> e9c951f (Création de la classe ProduitCard)
=======
export default App;
>>>>>>> aya
=======
export default App;
>>>>>>> aya
