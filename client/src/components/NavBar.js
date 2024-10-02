
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from './AuthContext';

const Navbar = () => {
    const { logout } = useContext(AuthContext);
    const { isAuthenticated, setIsAuthenticated, setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    console.log(isAuthenticated)
    const handleLogout = async () => {
        try {
            await axios.get('http://127.0.0.1:5555/logout', { headers: { "Access-Control-Allow-Credentials": true } }, { withCredentials: true });
            setIsAuthenticated(false);
            logout(null);
            navigate('/login');
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
                    <Link to="/categories">Categories</Link>
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