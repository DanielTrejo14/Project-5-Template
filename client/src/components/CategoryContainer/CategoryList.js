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
        <div style={styles.container}>
            <h1 style={styles.title}>Categories</h1>
            {error && <p style={styles.error}>{error}</p>}
            <ul style={styles.list}>
                {categories.map((category) => (
                    <li key={category.id} style={styles.listItem}>
                        <Link to={`/categories/${category.id}`} style={styles.link}>
                            {category.name}
                        </Link>
                        <span style={styles.separator}> | </span>
                        <Link to={`/categories/update/${category.id}`} style={styles.link}>
                            Edit
                        </Link>
                    </li>
                ))}
            </ul>
            <Link to="/categories/create" style={styles.createButton}>Create New Category</Link>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
    },
    title: {
        fontSize: '2rem',
        marginBottom: '20px',
    },
    error: {
        color: 'red',
    },
    list: {
        listStyleType: 'none',
        padding: '0',
    },
    listItem: {
        marginBottom: '10px',
        fontSize: '1.2rem',
    },
    link: {
        textDecoration: 'none',
        color: '#007bff',
    },
    separator: {
        margin: '0 10px',
        color: '#6c757d',
    },
    createButton: {
        display: 'inline-block',
        marginTop: '20px',
        padding: '10px 20px',
        backgroundColor: '#28a745',
        color: '#fff',
        textDecoration: 'none',
        borderRadius: '5px',
        fontSize: '1rem',
    },
};

export default CategoryList;
