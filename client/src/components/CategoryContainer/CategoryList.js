import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('/categories');
                setCategories(response.data);
            } catch (error) {
                setError('Error fetching categories');
            }
        };

        fetchCategories();
    }, []);

    return (
        <div>
            <h1>Categories</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
                {categories.map((category) => (
                    <li key={category.id}>
                        <Link to={`/categories/${category.id}`}>{category.name}</Link>
                        {' | '}
                        <Link to={`/categories/update/${category.id}`}>Edit</Link>
                    </li>
                ))}
            </ul>
            <Link to="/categories/create">Create New Category</Link>
        </div>
    );
};

export default CategoryList;
