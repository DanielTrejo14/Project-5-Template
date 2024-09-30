import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateCategory = () => {
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleCreateCategory = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/categories', { name }, { withCredentials: true });
            navigate.push('/categories');
        } catch (error) {
            setError(error.response?.data?.error || 'Error creating category');
        }
    };

    return (
        <div>
            <h1>Create Category</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleCreateCategory}>
                <div>
                    <label>Category Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    );
};

export default CreateCategory;
