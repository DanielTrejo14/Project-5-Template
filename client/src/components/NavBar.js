// frontend/src/components/Navbar.js

import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from './AuthContext';

const Navbar = () => {
    const { isAuthenticated, setIsAuthenticated, setUser } = useContext(AuthContext);
    const history = useHistory();

    const handleLogout = async () => {
        try {
            await axios.post('/logout', {}, { withCredentials: true });
            setIsAuthenticated(false);
            setUser(null);
            history.push('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <nav>
            <Link to="/">Home</Link>
            {isAuthenticated ? (
                <>
                    <Link to="/recipes/create">Create Recipe</Link>
                    <button onClick={handleLogout}>Logout</button>
                </>
            ) : (
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </>
            )}
        </nav>
    );
};

export default Navbar;
