// client/src/components/RecipeList.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
const RecipeList = () => {
    const [recipes, setRecipes] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await axios.get('http://localhost:5555/recipes');
                setRecipes(response.data);
            } catch (err) {
                setError('Failed to fetch recipes.');
                console.error(err);
            }
        };

        fetchRecipes();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div style={styles.container}>
            <h1>All Recipes</h1>
            <ul style={styles.list}>
                {recipes.map(recipe => (
                    <li key={recipe.id} style={styles.listItem}>
                        <Link to={`/recipes/${recipe.id}`} style={styles.link}>
                            {recipe.title}
                        </Link>
                    </li>
                ))}
            </ul>
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
    list: {
        listStyleType: 'none',
        padding: 0
    },
    listItem: {
        marginBottom: '10px'
    },
    link: {
        textDecoration: 'none',
        color: '#007bff'
    }
};

export default RecipeList;