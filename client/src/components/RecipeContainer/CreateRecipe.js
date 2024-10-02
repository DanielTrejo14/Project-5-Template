import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const CreateRecipe = () => {
    const { user } = useContext(AuthContext); // Using user from context
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: null,
        ingredients: ['']
    });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === 'image') {
            setFormData(prevState => ({
                ...prevState,
                image: files[0]
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleIngredientChange = (index, value) => {
        const newIngredients = [...formData.ingredients];
        newIngredients[index] = value;
        setFormData(prevState => ({
            ...prevState,
            ingredients: newIngredients
        }));
    };

    const addIngredientField = () => {
        setFormData(prevState => ({
            ...prevState,
            ingredients: [...prevState.ingredients, '']
        }));
    };

    const removeIngredientField = (index) => {
        const newIngredients = [...formData.ingredients];
        newIngredients.splice(index, 1);
        setFormData(prevState => ({
            ...prevState,
            ingredients: newIngredients
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title || !formData.description) {
            setError('Title and description are required.');
            return;
        }

        const data = new FormData();
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('user_id', user.id)
        if (formData.image) {
            data.append('image', formData.image);
        }
        data.append('ingredients', JSON.stringify(formData.ingredients));

        try {
            const response = await axios.post('http://localhost:5555/recipes', data, {
                headers: {
                    'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*"
                }
            });
            navigate(`/recipes/${response.data.recipe.id}`);
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to add recipe.');
            console.error(err);
        }
    };

    return (
        <div>
            <h2>Add New Recipe</h2>
            {user && <p>Logged in as: {user.username}</p>} {/* Display the username */}
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                {/* Form fields for title, description, image, and ingredients */}
                <div>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        name="description"
                        id="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="image">Image:</label>
                    <input
                        type="file"
                        name="image"
                        id="image"
                        accept="image/*"
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Ingredients:</label>
                    {formData.ingredients.map((ingredient, index) => (
                        <div key={index}>
                            <input
                                type="text"
                                value={ingredient}
                                onChange={(e) => handleIngredientChange(index, e.target.value)}
                                required
                                placeholder={`Ingredient ${index + 1}`}
                            />
                            {formData.ingredients.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeIngredientField(index)}
                                >
                                    Remove
                                </button>
                            )}
                        </div>
                    ))}
                    <button type="button" onClick={addIngredientField}>
                        Add Ingredient
                    </button>
                </div>
                <button type="submit">Create Recipe</button>
            </form>
        </div>
    );
};

export default CreateRecipe;