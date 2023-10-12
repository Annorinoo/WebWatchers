import React, { useState, useEffect } from "react";
import { fetchAllReviews } from "../API/ajaxHelper";
import jwt_decode from "jwt-decode"; // Make sure to import jwt_decode

export default function Reviews(user, setLoggedIn) {
    const [reviews, setReviews] = useState([]);
    const [thumbsUp, setThumbsUp] = useState({});
    const [thumbsDown, setThumbsDown] = useState({});
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        async function allReviewsHandler() {
            try {
                const result = await fetchAllReviews();
                setReviews(result.reviews);

                const initialThumbsUpState = {};
                const initialThumbsDownState = {};

                result.reviews.forEach((review) => {
                    initialThumbsUpState[review.id] = 0;
                    initialThumbsDownState[review.id] = 0;
                });

                setThumbsUp(initialThumbsUpState);
                setThumbsDown(initialThumbsDownState);
            } catch (error) {
                console.error(error);
            }
        }
        allReviewsHandler();
    }, []);

    const handleThumbsUp = (reviewId) => {
        if (!setLoggedIn) {
            alert("You must be logged in to vote.");
            return;
        }

        if (hasUserVoted(user.id, reviewId, "thumbsUp")) {
            alert("You have already voted on this review.");
            return;
        }

        setThumbsUp((prevThumbsUp) => ({
            ...prevThumbsUp,
            [reviewId]: prevThumbsUp[reviewId] + 1,
        }));

        markUserVoted(user.id, reviewId, "thumbsUp");
    };

    const handleThumbsDown = (reviewId) => {
        if (!setLoggedIn) {
            alert("You must be logged in to vote.");
            return;
        }

        if (hasUserVoted(user.id, reviewId, "thumbsDown")) {
            alert("You have already voted on this review.");
            return;
        }

        setThumbsDown((prevThumbsDown) => ({
            ...prevThumbsDown,
            [reviewId]: prevThumbsDown[reviewId] + 1,
        }));

        markUserVoted(user.id, reviewId, "thumbsDown");
    };

    function hasUserVoted(userId, reviewId, voteType) {
        const userVotes = JSON.parse(localStorage.getItem("userVotes")) || {};

        if (userVotes[userId] && userVotes[userId][reviewId]) {
            return userVotes[userId][reviewId] === voteType;
        }

        return false;
    }

    function markUserVoted(userId, reviewId, voteType) {
        const userVotes = JSON.parse(localStorage.getItem("userVotes")) || {};

        if (!userVotes[userId]) {
            userVotes[userId] = {};
        }

        userVotes[userId][reviewId] = voteType;

        localStorage.setItem("userVotes", JSON.stringify(userVotes));
    }

    const renderAllReviews = () => {
        const filteredReviews = reviews.filter((review) =>
            review.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        return filteredReviews.map((review) => (
            <div key={review.id} className="review">
                <h1 className="review-name">{review.name}</h1>
                <h3 className="review-content">{review.content}</h3>
                <h3 className="review-rating">{review.rating}</h3>
                <h3 className="review-date">{review.date}</h3>
                <div className="review-actions">
                    <button onClick={() => handleThumbsUp(review.id)}>
                        Thumbs Up ({thumbsUp[review.id]})
                    </button>
                    <button onClick={() => handleThumbsDown(review.id)}>
                        Thumbs Down ({thumbsDown[review.id]})
                    </button>
                </div>
            </div>
        ));
    };

    return (
        <div className="all-reviews">
            <input
                type="text"
                placeholder="Search reviews"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            {renderAllReviews()}
        </div>
    );
}

