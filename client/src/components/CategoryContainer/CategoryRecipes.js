import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CategoryRecipes = () => {
    const { id } = useParams();  // Get the category ID from URL
    const [recipes, setRecipes] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await axios.get(`http://localhost:5555/categories/${id}/recipes`);
                setRecipes(response.data);
            } catch (err) {
                setError(err.response?.data?.error || 'Failed to fetch recipes.');
            }
        };

        fetchRecipes();
    }, [id]);

    return (
        <div>
            <h2>Recipes in Category</h2>
            {error && <p>{error}</p>}
            {recipes.map((recipe) => (
                <div key={recipe.id}>
                    <h3>{recipe.title}</h3>
                    <p>{recipe.description}</p>
                </div>
            ))}
        </div>
    );
};

export default CategoryRecipes;
