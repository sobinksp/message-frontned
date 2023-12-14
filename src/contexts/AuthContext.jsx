import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const verifyToken = async () => {
            const userData = JSON.parse(localStorage.getItem('user_data'));
            const token = userData?.token;
            if (token) {
                try {
                    const response = await axios.post(
                        "http://localhost:8080/api/auth/verification",
                        { username: userData.username },
                        { headers: { Authorization: `Bearer ${token}` } }
                    );
                    setUser(response.data);
                    setIsAdmin(response.data.role === "ADMIN");
                } catch (error) {
                    console.error(error);
                    logout();
                }
            } else {
                navigate("/");
            }
        };
        verifyToken();
    }, []);

    const logout = () => {
        toast.success("Logged out successfully")
        localStorage.removeItem('user_data')
        setUser(null);
        setIsAdmin(false);
        setIsOpen(false);
        navigate("/");
        window.location.reload(true);
        
    };

    return <AuthContext.Provider value={{ user, setUser, logout, isAdmin, setIsAdmin, isOpen, setIsOpen }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};
