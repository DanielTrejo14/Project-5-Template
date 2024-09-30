// frontend/src/components/UpdateCategory.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UpdateCategory = ({ match }) => {
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await axios.get(`/categories/${match.params.id}`);
                setName(response.data.name);
            } catch (error) {
                setError('Error fetching category details');
            }
        };

        fetchCategory();
    }, [match.params.id]);

    const handleUpdateCategory = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/categories/${match.params.id}`, { name }, { withCredentials: true });
            navigate.push(`/categories/${match.params.id}`);
        } catch (error) {
            setError(error.response?.data?.error || 'Error updating category');
        }
    };

    return (
        <div>
            <h1>Update Category</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleUpdateCategory}>
                <div>
                    <label>Category Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default UpdateCategory;
