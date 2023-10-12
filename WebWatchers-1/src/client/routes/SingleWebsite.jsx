import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SingleWebsiteDetails from "../components/SingleWebsiteDetails";
import SingleWebsiteReviews from "../components/SingleWebsiteReviews"; // Import the component for reviews
import PostReviewForm from "../components/PostReviewForm";
import { fetchSingleWebsite } from "../API/ajaxHelper";
import "../Style/SingleWebsite.css";

const SingleWebsitePage = () => {
  const { id } = useParams();
  const [singleWebsiteDetails, setSingleWebsiteDetails] = useState(null);


  useEffect(() => {
    // Fetch website details based on the id
    async function fetchDetails() {
      try {
        const result = await fetchSingleWebsite(id);
        setSingleWebsiteDetails(result.website);
      } catch (error) {
        console.error("Error fetching website details:", error);
        // Handle error or display a message to the user
      }
    }

    // Call the fetchDetails function
    fetchDetails();
  }, [id]);

  return (
    <div>
      <SingleWebsiteDetails singleWebsiteDetails={singleWebsiteDetails} />
      <PostReviewForm/>
      <SingleWebsiteReviews />
    </div>
  );
}

export default SingleWebsitePage;
