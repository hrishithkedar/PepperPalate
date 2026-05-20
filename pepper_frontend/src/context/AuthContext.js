import { createContext, useContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import BACK_URL from "../config.js";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [cookie, setCookie, removeCookie] = useCookies(["token"]);

    const token = cookie.token;

    const fetchUser = async () => {
        if (!token) {
            setLoading(false);
            return;
        }
        try {
            const res = await fetch(`${BASE_URL}/auth/getUser`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            const data = await res.json();
            setUser(data || null);
        } catch (error) {
            console.error("Error fetching user:", error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, [token]);

    const login = (token, userData) => {
        const date = new Date();
        date.setDate(date.getDate() + 30);
        setCookie("token", token, { path: "/", expires: date });
        setUser(userData);
    };

    const logout = () => {
        removeCookie("token", { path: "/" });
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, login, logout, fetchUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);