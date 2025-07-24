import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState(null);

    // Dummy state to force re-render
    const [version, setVersion] = useState(0);

    // Load userInfo from localStorage on mount
    useEffect(() => {
        const savedUser = localStorage.getItem("userInfo");
        if (savedUser) {
            try {
                setUserInfo(JSON.parse(savedUser));
            } catch (err) {
                console.error("Error parsing userInfo:", err);
            }
        }
    }, []);

    const loginUser = (userData) => {
        setUserInfo(userData);
        localStorage.setItem("userInfo", JSON.stringify(userData));
        setVersion((v) => v + 1); // 🔁 trigger context update
    };

    const logoutUser = () => {
        localStorage.removeItem("userInfo");
        setUserInfo(null);
        setVersion((v) => v + 1); // 🔁 trigger context update
    };

    return (
        <UserContext.Provider value={{ userInfo, loginUser, logoutUser }}>
            {children}
        </UserContext.Provider>
    );
};