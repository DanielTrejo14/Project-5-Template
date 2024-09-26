// frontend/components/CreateRecipe.js

import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const CreateRecipe = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();

    const handleCreateRecipe = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/recipes', { title, description });
            history.push('/recipes'); // Redirect to the recipe list after creation
        } catch (error) {
            setError('Error creating recipe');
        }
    };

    return (
        <div>
            <h1>Create Recipe</h1>
            {error && <p>{error}</p>}
            <form onSubmit={handleCreateRecipe}>
                <div>
                    <label>Title</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                    <label>Description</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    );
};

export default CreateRecipe;
