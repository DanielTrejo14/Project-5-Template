import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { AuthContext } from '../AuthContext'
const RecipeDetail = () => {
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState(null);
    const [newReview, setNewReview] = useState({ content: '', rating: 5 });
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get(`/recipes/${id}`);
                setRecipe(response.data);
            } catch (err) {
                setError('Failed to fetch recipe details.');
                console.error(err);
            }
        };

        fetchRecipe();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewReview(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();

        if (newReview.content.trim() === '') {
            alert('Please enter a review.');
            return;
        }

        try {
            const response = await axios.post(`/recipes/${id}/reviews`, { ...newReview, user_id: user.id });
            setRecipe(prevRecipe => ({
                ...prevRecipe,
                reviews: [...prevRecipe.reviews, response.data.review]
            }));
            setNewReview({ content: '', rating: 5 });
        } catch (err) {
            alert(err.response?.data?.error || 'Failed to add review.');
            console.error(err);
        }
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!recipe) {
        return <div>Loading...</div>;
    }

    return (
        <div style={styles.container}>
            <h1>{recipe.title}</h1>
            {recipe.image_url && (
                <img src={recipe.image_url} alt={recipe.title} style={styles.image} />
            )}
            <p>{recipe.description}</p>

            <h2>Ingredients</h2>
            <ul>

                <li>{recipe.ingredients}</li>

            </ul>

            <h2>Reviews</h2>
            {recipe.reviews.length === 0 ? (
                <p>No reviews yet. Be the first to review!</p>
            ) : (
                <ul>
                    {recipe.reviews.map(review => (
                        <li key={review.id} style={styles.reviewItem}>
                            <strong>Rating:</strong> {review.rating}/5<br />
                            <strong>Comment:</strong> {review.content}
                        </li>
                    ))}
                </ul>
            )}

            <h3>Add a Review</h3>
            <form onSubmit={handleReviewSubmit} style={styles.form}>
                <div style={styles.formGroup}>
                    <label htmlFor="rating">Rating:</label>
                    <select
                        id="rating"
                        name="rating"
                        value={newReview.rating}
                        onChange={handleInputChange}
                        style={styles.select}
                    >
                        {[1, 2, 3, 4, 5].map(num => (
                            <option key={num} value={num}>{num}</option>
                        ))}
                    </select>
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="content">Comment:</label>
                    <textarea
                        id="content"
                        name="content"
                        value={newReview.content}
                        onChange={handleInputChange}
                        required
                        style={styles.textarea}
                    ></textarea>
                </div>
                <button type="submit" style={styles.button}>Submit Review</button>
            </form>
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
    image: {
        width: '100%',
        maxWidth: '400px',
        height: 'auto',
        borderRadius: '8px'
    },
    reviewItem: {
        borderBottom: '1px solid #ccc',
        padding: '10px 0'
    },
    form: {
        marginTop: '20px'
    },
    formGroup: {
        marginBottom: '15px'
    },
    select: {
        width: '100%',
        padding: '8px',
        boxSizing: 'border-box'
    },
    textarea: {
        width: '100%',
        height: '100px',
        padding: '8px',
        boxSizing: 'border-box'
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#28a745',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
    }
};

export default RecipeDetail;