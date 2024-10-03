// src/components/EditRecipe.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditRecipe = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState({ title: '', description: '', ingredients: '' });
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get(`http://localhost:5555/recipes/${id}`);
                setRecipe(response.data);
            } catch (err) {
                setError('Failed to fetch recipe details.');
                console.error(err);
            }
        };

        fetchRecipe();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRecipe(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:5555/recipes/${id}`, recipe);
            alert('Recipe updated successfully');
            navigate(`/recipes/${id}`);
        } catch (err) {
            alert(err.response?.data?.error || 'Failed to update recipe.');
            console.error(err);
        }
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div style={styles.container}>
            <h1>Edit Recipe</h1>
            <form onSubmit={handleUpdate} style={styles.form}>
                <div style={styles.formGroup}>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={recipe.title}
                        onChange={handleInputChange}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={recipe.description}
                        onChange={handleInputChange}
                        required
                        style={styles.textarea}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="ingredients">Ingredients:</label>
                    <textarea
                        id="ingredients"
                        name="ingredients"
                        value={recipe.ingredients}
                        onChange={handleInputChange}
                        required
                        style={styles.textarea}
                    />
                </div>
                <button type="submit" style={styles.button}>Update Recipe</button>
            </form>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        fontFamily: 'Arial, sans-serif'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
    },
    formGroup: {
        marginBottom: '15px'
    },
    input: {
        width: '100%',
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc'
    },
    textarea: {
        width: '100%',
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        height: '100px'
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#28a745',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
    }
};

export default EditRecipe;
