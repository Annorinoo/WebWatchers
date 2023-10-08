import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchSingleWebsite } from "../API/ajaxHelper";
import { fetchAllReviews } from "../API/ajaxHelper";
import "../Style/SingleWebsite.css";

export default function SingleWebsiteReviews() {
  const { id } = useParams();
  const [singleWebsite, setSingleWebsite] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch website details
        const websiteResult = await fetchSingleWebsite(id);
        setSingleWebsite(websiteResult.website);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [id]);

  useEffect(() => {
    // Fetch all reviews
    async function fetchAllAndFilterReviews() {
      try {
        console.log("Fetching all reviews..."); // Add a log statement to track the execution
  
        const parsedId = parseInt(id);
        console.log("Parsed ID:", parsedId); // Log the parsed ID
  
        const allReviews = await fetchAllReviews();
  
        console.log("Fetched all reviews:", allReviews); // Log the fetched reviews
  
        // Filter reviews based on websiteId
        const filteredReviews = allReviews.reviews.filter(
          (review) => review.websiteid === parsedId
        );
  
        console.log("Filtered reviews:", filteredReviews); // Log the filtered reviews
  
        setReviews(filteredReviews);
      } catch (error) {
        console.error("Error fetching and filtering reviews:", error);
      }
    }
  
    fetchAllAndFilterReviews(); // Call the fetchAllAndFilterReviews function
  }, [id]);
  

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
    <div className="single-website-container">
      {renderReviews()}
    </div>
  );
}
