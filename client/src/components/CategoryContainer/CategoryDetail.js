import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const CategoryDetail = () => {
    const { id } = useParams();  // Use useParams hook to get the dynamic route parameter
    const [category, setCategory] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await axios.get(`/categories/${id}`);
                setCategory(response.data);
            } catch (error) {
                setError('Error fetching category details');
            }
        };

        fetchCategory();
    }, [id]);

    if (error) return <p style={{ color: 'red' }}>{error}</p>;
    if (!category) return <p>Loading...</p>;

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>{category.name}</h1>

            <h3 style={styles.subtitle}>Recipes in this category:</h3>
            <ul style={styles.recipeList}>
                {category.recipes && category.recipes.length > 0 ? (
                    category.recipes.map((recipe) => (
                        <li key={recipe.id} style={styles.recipeItem}>
                            <Link to={`/recipes/${recipe.id}`} style={styles.link}>
                                {recipe.title}
                            </Link>
                        </li>
                    ))
                ) : (
                    <p>No recipes found in this category.</p>
                )}
            </ul>

            <Link to={`/categories/update/${category.id}`} style={styles.editLink}>
                Edit Category
            </Link>
        </div>
    );
};

// Styling object
const styles = {
    container: {
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
        textAlign: 'center',
    },
    title: {
        fontSize: '2rem',
        marginBottom: '20px',
    },
    subtitle: {
        fontSize: '1.5rem',
        marginBottom: '10px',
    },
    recipeList: {
        listStyleType: 'none',
        padding: '0',
    },
    recipeItem: {
        marginBottom: '10px',
        fontSize: '1.2rem',
    },
    link: {
        textDecoration: 'none',
        color: '#007bff',
    },
    editLink: {
        marginTop: '20px',
        display: 'inline-block',
        padding: '10px 15px',
        backgroundColor: '#28a745',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '5px',
    },
};

export default CategoryDetail;
