import React, { useState } from "react";
import { createReview } from "../API/ajaxHelper";

export default function PostReviewForm({ websiteId }) {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);

  const handlePostReview = async (e) => {
    e.preventDefault();
  
    const review = {
      name: name,
      content: content,
      rating: rating,
    };

    const response = await createReview(websiteId, review.name, review.content, review.rating);
    console.log(response);

    if (response.error) {
        console.log(error, 'Message')
        setFormErrorMessage("form information is incorrect. try again");
    } else {
        console.log("form submission successful!")
    }
  };

  return (
    <div>
      <h2>Post a Review</h2>
      <form onSubmit={handlePostReview}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Content:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Rating:</label>
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
          />
        </div>
        <button type="submit">Post Review</button>
      </form>
    </div>
  );
}
