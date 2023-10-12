import React, { useState, useEffect } from "react";
import { fetchAllReviews, fetchAllWebsites } from "../API/ajaxHelper";
import { Link } from "react-router-dom";
import "../Style/WebsitesList.css";
// import urlLink from "../assets/export-icon.png";

export default function WebsitesList() {
  const [websites, setWebsites] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const websitesData = await fetchAllWebsites();
        const reviewsData = await fetchAllReviews();
        setWebsites(websitesData.websites);
        setReviews(reviewsData.reviews);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  function calculateAverageRatings(ratings) {
    const totalRatings = ratings.length;
    if (totalRatings === 0) return 0;
    const sum = ratings.reduce((acc, rating) => acc + rating, 0);
    return sum / totalRatings;
  }

  function handleSearchInputChange(event) {
    setSearchTerm(event.target.value);
  }

  function renderAllWebsites() {
    return websites
      .filter((website) => {
        const lowercasedName = (website.name || "").toLowerCase();
        const lowercasedContent = (website.content || "").toLowerCase();
        const lowercasedSearchTerm = searchTerm.toLowerCase();
        return (
          lowercasedName.includes(lowercasedSearchTerm) ||
          lowercasedContent.includes(lowercasedSearchTerm)
        );
      })
      .map((website) => {
        const websiteReviews = reviews.filter((review) => review.websiteid === website.id);
        const websiteRatings = websiteReviews.map((review) => review.rating);
        const averageRating = calculateAverageRatings(websiteRatings);

        console.log("Ratings for Website ID", website.id, ":", websiteRatings);

        return (
          <div key={website.id} className="website-container">
            <div className="singleWebsite-container">
              <Link to={`/websites/${website.id}`}>
                <h1 className="website-name">{website.name}</h1>
                <h3>Average Rating: {averageRating.toFixed(2)}</h3>
                <img src={website.image} alt={website.name} className="website-image" />
                <h2 className="website-description">{website.description}</h2>
              </Link>
            </div>
            <div className="smaller-container">
              <a href={website.url} target="_blank" rel="noopener noreferrer" className="website-url">
                {/* Include the URL icon here */}
                {/* <img src={urlLink} alt={website.name} className="website-image" /> */}
                {website.url}
              </a>
            </div>
          </div>
        );
      });
  }

  return (
    <div className="all-websites">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search Websites..."
          value={searchTerm}
          onChange={handleSearchInputChange}
          className="search-input"
        />
      </div>
      <div className="Website_List">{renderAllWebsites()}</div>
    </div>
  );
}


