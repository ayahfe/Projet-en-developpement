import { createContext, useState, useCallback, useEffect } from "react";
import PRODUIT from "../data/produitList";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [role, setRole] = useState(null);
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState(null);

    const [produits, setProduits] = useState(() =>{
        const saved = localStorage.getItem("produitsState");
        if (saved) return JSON.parse(saved);
    })
    
}