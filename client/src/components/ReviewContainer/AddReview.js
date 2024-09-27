import React, { useState, useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '../AuthContext'


const AddReview = ({ recipeId, onReviewAdded }) => {
    const [content, setContent] = useState('')
    const [rating, setRating] = useState(5)
    const [error, setError] = useState('')
    const { isAuthenticated } = useContext(AuthContext)


    const handleAddReview = async (e) => {
        e.preventDefault()
        if (!isAuthenticated) {
            setError('You must be logged in to add a review.')
            return;
        }

        try {
            await axios.get(`/recipes/${recipeId}/reviews`, { content, rating }, { withCredentials: true })
            setContent('')
            setRating(5)
            onReviewAdded()
        } catch (error) {
            setError(error.response?.data?.error || 'Error adding review')
        }

    }
}