import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const CategoryDetail = () => {
    const { id } = useParams();  // Get category ID from URL
    const [category, setCategory] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await axios.get(`/categories/${id}`);
                setCategory(response.data);  // Expect response to include category with recipes
            } catch (error) {
                setError('Error fetching category details');
            }
        };

        fetchCategory();
    }, [id]);

    if (error) return <p style={{ color: 'red' }}>{error}</p>;
    if (!category) return <p>Loading...</p>;

    return (
        <div>
            <h1>{category.name}</h1>
            <h3>Recipes in this category:</h3>
            <ul>
                {category.recipes && category.recipes.length > 0 ? (
                    category.recipes.map((recipe) => (
                        <li key={recipe.id}>
                            <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
                        </li>
                    ))
                ) : (
                    <p>No recipes found in this category.</p>
                )}
            </ul>
            <Link to={`/categories/update/${category.id}`}>Edit Category</Link>
        </div>
    );
};




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
