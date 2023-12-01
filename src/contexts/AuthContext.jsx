import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(null);
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("auth_token");
        setUser(null);
        navigate("/");
        window.location.reload(true);
    };

    return <AuthContext.Provider value={{ user, setUser, logout, isAdmin, setIsAdmin }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};
