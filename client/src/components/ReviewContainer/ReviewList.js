// frontend/src/components/ReviewList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReviewList = ({ recipeId }) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`/recipes/${recipeId}/reviews`);
                setReviews(response.data);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, [recipeId]);

    if (loading) return <p>Loading reviews...</p>;
    if (reviews.length === 0) return <p>No reviews yet.</p>;

    return (
        <div>
            <h3>Reviews:</h3>
            <ul>
                {reviews.map((review) => (
                    <li key={review.id}>
                        <strong>{review.user.username}</strong>: {review.content} (Rating: {review.rating})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ReviewList;
