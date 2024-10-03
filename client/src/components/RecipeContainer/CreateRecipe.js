import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const CreateRecipe = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [presetCats, setPresetCats] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        ingredients: [''],
        image_url: '',
        categories: ''
    });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
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

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`/categories`);
                setPresetCats(response.data)
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories()
            ;
    }, []);

    const handleCategoryChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
        setFormData(prevState => ({
            ...prevState,
            categories: selectedOptions
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title || !formData.description || !formData.image_url) {
            setError('Title, description, and image URL are required.');
            return;
        }

        const data = {
            title: formData.title,
            description: formData.description,
            user_id: user.id,
            image_url: formData.image_url,
            ingredients: formData.ingredients,
            categories: formData.categories // Sending selected categories as an array
        };

        try {
            const response = await axios.post('http://localhost:5555/recipes', data, {
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*"
                }
            });
            navigate(`/recipes/${response.data.recipe.id}`);
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to add recipe.');
            console.error(err);
        }
    };
    const categoriesMapped = presetCats.map(categories => <option key={categories.id} value={categories.id}>{categories.name}</option>)
    return (
        <div>
            <h2>Add New Recipe</h2>
            {user && <p>Logged in as: {user.username}</p>}
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
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
                    <label htmlFor="image_url">Image URL:</label>
                    <input
                        type="text"
                        name="image_url"
                        id="image_url"
                        value={formData.image_url}
                        onChange={handleChange}
                        required
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
                <div>
                    <label htmlFor="categories">Categories:</label>
                    <select
                        name="categories"
                        id="categories"
                        value={formData.categoriesMapped}
                        onChange={handleCategoryChange}
                    >
                        {categoriesMapped}
                    </select>
                </div>
                <button type="submit">Create Recipe</button>
            </form>
        </div>
    );
};

export default CreateRecipe;