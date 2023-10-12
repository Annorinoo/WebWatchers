import React, { useState } from 'react';
import { createReview } from '../API/ajaxHelper';
import { useParams } from 'react-router-dom';


const PostReviewForm = () => {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(1);
  const { id } = useParams();
  const websiteid = id;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createReview(name, content, rating, websiteid);
      console.log(websiteid);
      // Handle the response, e.g., show a success message or handle errors.
    } catch (error) {
      // Handle errors, e.g., show an error message to the user.
      console.error('Error posting review:', error);
    }
  };

  return (
    <div>
      <h2>Post a Review</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          Content:
          <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
        </label>
        <label>
          Rating:
          <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} required />
        </label>
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default PostReviewForm;
