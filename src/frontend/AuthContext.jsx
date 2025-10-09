import { createContext, useState, useCallback } from "react";

export const AuthContext = createContext();

export function AuthProvider({children}){
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [role, setRole] = useState(null);
    const [email, setEmail] = useState(null);

    const login = useCallback((userRole, userEmail)=> {
        setIsLoggedIn(true);
        setRole(userRole);
        setEmail(userEmail);
    },[]);

    const logout = useCallback(()=> {
        setIsLoggedIn(false);
        setRole(null);
        setEmail(null);
    }, []);
    return (
        <AuthContext.Provider value={{isLoggedIn, role, email, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}