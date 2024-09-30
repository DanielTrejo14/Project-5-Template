import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CategoryDetail = ({ match }) => {
    const [category, setCategory] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await axios.get(`/categories/${match.params.id}`);
                setCategory(response.data);
            } catch (error) {
                setError('Error fetching category details');
            }
        };

        fetchCategory();
    }, [match.params.id]);

    if (error) return <p style={{ color: 'red' }}>{error}</p>;
    if (!category) return <p>Loading...</p>;

    return (
        <div>
            <h1>{category.name}</h1>
            <h3>Recipes in this category:</h3>
            <ul>
                {category.recipes.map((recipe) => (
                    <li key={recipe.id}>
                        <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
                    </li>
                ))}
            </ul>
            <Link to={`/categories/update/${category.id}`}>Edit Category</Link>
        </div>
    );
};

export default CategoryDetail;
