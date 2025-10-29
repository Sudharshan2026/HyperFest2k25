import React, { createContext, useState, useEffect, useContext } from 'react';
import { api } from '../api'; // Revert to using the main api object

export const AuthContext = createContext({
    currentUser: null,
    authToken: null,
    login: () => Promise.resolve(),
    logout: () => {},
    refreshUserData: () => Promise.resolve(), // <-- NEW FUNCTION ADDED
});

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
    const [isLoading, setIsLoading] = useState(true);

    // Function to re-fetch user details from the server
    const refreshUserData = async () => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            setCurrentUser(null);
            return Promise.resolve(null);
        }

        try {
            // ASSUMPTION: You have an API endpoint to fetch the logged-in user's details
            // FIX: Use the corrected api.getProfile() function
            const updatedUser = await api.getProfile(); 
            setCurrentUser(updatedUser);
            localStorage.setItem('currentUser', JSON.stringify(updatedUser));
            return updatedUser;
        } catch (error) {
            console.error("Failed to refresh user data:", error);
            // If token is invalid/expired, log out the user
            logout();
            return Promise.reject(error);
        }
    };

    const login = async (token, user) => {
        // Store data in localStorage
        localStorage.setItem('authToken', token);
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        // Update state
        setAuthToken(token);
        setCurrentUser(user);
        
        // No need for an artificial delay here
        return user;
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('currentUser');
        setAuthToken(null);
        setCurrentUser(null);
    };

    useEffect(() => {
        // Load user data on initial mount if token exists
        if (authToken) {
            refreshUserData();
        }
        setIsLoading(false);
    }, [authToken]);

    // Expose context values
    const contextValue = {
        currentUser,
        authToken,
        login,
        logout,
        refreshUserData, // <-- EXPOSED
        isLoading
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};