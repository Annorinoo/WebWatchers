import React, { useState, useEffect } from "react";
import { fetchAllReviews } from "../API/ajaxHelper";
import jwt_decode from 'jwt-decode';

export default function Profile() {
  const token = localStorage.getItem('token');
  const [username, setUsername] = useState('');
  const [id, setId] = useState('');
  const [reviews, setReviews] = useState([]); // Initialize reviews state

  useEffect(() => {
    if (token) {
      try {
        // Decode the token to get the user ID
        const decodedToken = jwt_decode(token);
        // Fetch all reviews and then filter based on the user's ID
        setUsername(decodedToken.username);
        setId(decodedToken.id);

        fetchAllReviews()
          .then((allReviews) => {
            const filteredReviews = allReviews.reviews.filter(
              (review) => review.authorid === decodedToken.id
            );
            setReviews(filteredReviews); // Set the reviews state
          })
          .catch((error) => {
            console.error("Error fetching reviews:", error);
          });
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, [token]);

  function renderReviews() {
    if (reviews.length > 0) {
      return (
        <div className="reviews">
          <h2>Reviews:</h2>
          <ul>
            {reviews.map((review) => (
              <li key={review.id}>
                <h3>{review.name}</h3>
                <p>{review.content}</p>
                <p>Rating: {review.rating}</p>
                <p>Date: {new Date(review.date).toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        </div>
      );
    } else {
      return <p>No reviews available.</p>;
    }
  }

  return (
    <div className="panel">
      <h1>Welcome {username}!</h1>
      <h2>Your current id is {id}!</h2>
      <div className="filtered-reviews-container">
        {renderReviews()}
      </div>
    </div>
  );
}
