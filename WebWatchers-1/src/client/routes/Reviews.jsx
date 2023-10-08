import { useState, useEffect } from "react"
import { fetchAllReviews, deleteReview } from "../API/ajaxHelper";

export default function Reviews() {
    const [reviews, setReviews] = useState([]);

    function renderAllReviews() {
        return reviews.map((review) => {
            return (
                <div key={review?.id} className="reviews">
                    <h1 className="review-name">{review?.name}</h1>
                    <h3 className="review-content">{review?.content}</h3>
                    <h3 className="review-rating">{review?.rating}</h3>
                    <h3 className="review-date">{review?.date}</h3>
                    <button className="review-button" onClick={() => handleDelete(review.id)}>Delete</button>
                </div>
            )
        })
    }

    useEffect(() => {
        async function allReviewsHandler() {
            const result = await fetchAllReviews();
            console.log({result});
            setReviews(result.reviews);
        } allReviewsHandler();
    }, [])

    async function handleDelete(reviewId) {
        try {
            await deleteReview(reviewId);
            const updatedReviews = await fetchAllReviews();
            setReviews(updatedReviews.reviews);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="all-reviews">
            {renderAllReviews()}
        </div>
    )
}