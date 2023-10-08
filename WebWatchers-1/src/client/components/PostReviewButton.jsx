import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function ReviewButton() {
  const { id } = useParams();
  const [hasSubmittedReview, setHasSubmittedReview] = useState(false);

  function handlePostReview() {
    // Check if the user has already submitted a review for this website
    const hasUserAlreadyReviewed = reviews.some(
      (review) =>
        review.authorid === currentUserAuthorId && review.websiteid === parseInt(id)
    );
  
    if (hasUserAlreadyReviewed) {
      // Display a message indicating that the user already has a review
      alert("You have already submitted a review for this website.");
    } else {
      // Implement code to open a review submission form or modal
      // After successful submission, set hasSubmittedReview to true
      setHasSubmittedReview(true);
    }
  }  

  return (
    <div>
      {!hasSubmittedReview && (
        <button onClick={handlePostReview}>Post Review</button>
      )}
    </div>
  );
}
