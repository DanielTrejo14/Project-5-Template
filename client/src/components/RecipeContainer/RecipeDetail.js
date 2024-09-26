// frontend/components/RecipeDetail.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RecipeDetail = ({ match }) => {
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            const response = await axios.get(`/recipes/${match.params.id}`);
            setRecipe(response.data);
        };

        fetchRecipe();
    }, [match.params.id]);

    if (!recipe) return <div>Loading...</div>;

    return (
        <div>
            <h1>{recipe.title}</h1>
            <p>{recipe.description}</p>
            <p>Author: {recipe.author.username}</p>
            <h3>Categories:</h3>
            <ul>
                {recipe.categories.map((category, index) => (
                    <li key={index}>{category}</li>
                ))}
            </ul>
        </div>
    );
};

export default RecipeDetail;
