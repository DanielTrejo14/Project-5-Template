import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

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

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this recipe?')) {
            try {
                await axios.delete(`http://localhost:5555/recipes/${id}`);
                // Update the recipes state to remove the deleted recipe
                setRecipes(recipes.filter(recipe => recipe.id !== id));
                alert('Recipe deleted successfully');
            } catch (err) {
                alert(err.response?.data?.error || 'Failed to delete recipe.');
                console.error(err);
            }
        }
    };

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
                        <button
                            onClick={() => handleDelete(recipe.id)}
                            style={styles.deleteButton}>
                            Delete
                        </button>
                        <Link to={`/recipes/edit/${recipe.id}`} style={styles.editButton}>
                            Edit
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
        marginBottom: '10px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    link: {
        textDecoration: 'none',
        color: '#007bff',
        flexGrow: 1
    },
    deleteButton: {
        padding: '5px 10px',
        backgroundColor: '#dc3545',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginLeft: '10px'
    }
};

export default RecipeList;
