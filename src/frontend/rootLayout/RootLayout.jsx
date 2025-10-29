import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../navbar/Navbar"; // <-- importe ta navbar

const RootLayout = () => {
  const location = useLocation();

  // facultatif : cacher la navbar sur login/signup
  const hideNavbar =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      {!hideNavbar && <Navbar />}
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
