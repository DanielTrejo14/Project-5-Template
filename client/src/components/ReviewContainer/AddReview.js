
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';

const AddReview = ({ recipeId, onReviewAdded }) => {
    const [content, setContent] = useState('');
    const [rating, setRating] = useState(5);
    const [error, setError] = useState('');
    const { isAuthenticated } = useContext(AuthContext);

    const handleAddReview = async (e) => {
        e.preventDefault();
        if (!isAuthenticated) {
            setError('You must be logged in to add a review.');
            return;
        }

        try {
            await axios.post(`/recipes/${recipeId}/reviews`, { content, rating }, { withCredentials: true });
            setContent('');
            setRating(5);
            onReviewAdded();
        } catch (error) {
            setError(error.response?.data?.error || 'Error adding review');
        }
    };

    return (
        <div>
            <h3>Add a Review:</h3>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleAddReview}>
                <div>
                    <label>Rating:</label>
                    <select value={rating} onChange={(e) => setRating(e.target.value)} required>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                    </select>
                </div>
                <div>
                    <label>Review:</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    ></textarea>
                </div>
                <button type="submit">Submit Review</button>
            </form>
        </div>
    );
};

export default AddReview;
