import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const API_URL = 'http://localhost:5555'; // Set your backend URL here

    const fetchCurrentUser = async () => {
        try {
            const response = await axios.get(`${API_URL}/current_user`); // Using full URL
            setUser(response.data.user);
            setIsAuthenticated(true)
        } catch (error) {
            setUser(null);
            setIsAuthenticated(false)
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCurrentUser();
    }, []);

    const login = async (email, password) => {
        try {
            const response = await axios.post(`${API_URL}/login`, { email, password }, { Headers: { 'Access-Control-Allow-Origin': "*", "content-type": "application/json" } },); // Using full URL
            console.log(response.data.user)
            setUser(response.data.user);
            setIsAuthenticated(true)
            return { success: true };
        } catch (error) {
            return { success: false, message: error.response?.data?.error || 'Login failed.' };
        }
    };

    const logout = async () => {
        try {
            await axios.get(`${API_URL}/logout`, { headers: { "Access-Control-Allow-Credentials": true } }, { withCredentials: true });
            setUser(null);
            setIsAuthenticated(false);
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };


    return (
        <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );

};