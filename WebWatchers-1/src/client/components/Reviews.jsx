// import React, { useState, useEffect } from "react";
// import { fetchAllReviews, deleteReview } from "../API/ajaxHelper";

// export default function Reviews( user, setLoggedIn) {
//     const [reviews, setReviews] = useState([]);
//     const [thumbsUp, setThumbsUp] = useState({});
//     const [thumbsDown, setThumbsDown] = useState({});
//     const token = localStorage.getItem('token');
//     const user = jwt_decode('token');
//     const [searchQuery, setSearchQuery] = useState("");

//     useEffect(() => {
//         async function allReviewsHandler() {
//             try {
//                 const result = await fetchAllReviews();
//                 setReviews(result.reviews);

//                 // Initialize the thumbs up and thumbs down state for each review
//                 const initialThumbsUpState = {};
//                 const initialThumbsDownState = {};

//                 result.reviews.forEach((review) => {
//                     initialThumbsUpState[review.id] = 0;
//                     initialThumbsDownState[review.id] = 0;
//                 });                

//                 setThumbsUp(initialThumbsUpState);
//                 setThumbsDown(initialThumbsDownState);
//             } catch (error) {
//                 console.error(error);
//             }
//         }
//         allReviewsHandler();
//     }, []);

//     const handleThumbsUp = (reviewId, token) => {
//         if (!setLoggedIn) {
//             // User not logged in, show a message or prevent voting
//             alert("You must be logged in to vote.");
//             return;
//         }

//         if (hasUserVoted(user.id, reviewId, "thumbsUp")) {
//             // User has already voted, show a message or prevent voting
//             alert("You have already voted on this review.");
//             return;
//         }

//         setThumbsUp((prevThumbsUp) => ({
//             ...prevThumbsUp,
//             [reviewId]: prevThumbsUp[reviewId] + 1,
//         }));

//         // Remember that the user has voted on this review
//         markUserVoted(user.id, reviewId, "thumbsUp");
//     };

//     const handleThumbsDown = (reviewId) => {
//         if (!setLoggedIn) {
//             // User not logged in, show a message or prevent voting
//             alert("You must be logged in to vote.");
//             return;
//         }

//         if (hasUserVoted(user.id, reviewId, "thumbsDown")) {
//             // User has already voted, show a message or prevent voting
//             alert("You have already voted on this review.");
//             return;
//         }

//         setThumbsDown((prevThumbsDown) => ({
//             ...prevThumbsDown,
//             [reviewId]: prevThumbsDown[reviewId] + 1,
//         }));

//         // Remember that the user has voted on this review
//         markUserVoted(user.id, reviewId, "thumbsDown");
//     };

//     // Helper functions to check and record user votes
//     function hasUserVoted(userId, reviewId, voteType) {
//         // Retrieve the user's votes from local storage
//         const userVotes = JSON.parse(localStorage.getItem("userVotes")) || {};

//         // Check if the user has voted for the specified review and vote type
//         if (userVotes[userId] && userVotes[userId][reviewId]) {
//             return userVotes[userId][reviewId] === voteType;
//         }

//         return false;
//     }

//     function markUserVoted(userId, reviewId, voteType) {
//         // Retrieve the user's votes from local storage
//         const userVotes = JSON.parse(localStorage.getItem("userVotes")) || {};

//         // Create a new vote entry for the user if it doesn't exist
//         if (!userVotes[userId]) {
//             userVotes[userId] = {};
//         }

//         // Mark that the user has voted for the specified review and vote type
//         userVotes[userId][reviewId] = voteType;

//         // Store the updated user votes in local storage
//         localStorage.setItem("userVotes", JSON.stringify(userVotes));
//     }

//     const renderAllReviews = () => {
//         const filteredReviews = reviews.filter((review) =>
//             review.name.toLowerCase().includes(searchQuery.toLowerCase())
//         );

//         return filteredReviews.map((review) => (
//             <div key={review.id} className="review">
//                 <h1 className="review-name">{review.name}</h1>
//                 <h3 className="review-content">{review.content}</h3>
//                 <h3 className="review-rating">{review.rating}</h3>
//                 <h3 className="review-date">{review.date}</h3>
//                 <div className="review-actions">
//                     <button onClick={() => handleThumbsUp(review.id)}>
//                         Thumbs Up ({thumbsUp[review.id]})
//                     </button>
//                     <button onClick={() => handleThumbsDown(review.id)}>
//                         Thumbs Down ({thumbsDown[review.id]})
//                     </button>
//                     <button onClick={() => handleDelete(review.id)}>Delete</button>
//                 </div>
//             </div>
//         ));
//     };

//     async function handleDelete(reviewId, token) {
//         try {
//             await deleteReview(reviewId, token);
//             const updatedReviews = await fetchAllReviews();
//             setReviews(updatedReviews);
//         } catch (error) {
//             console.error(error);
//         }
//     }

//     return (
//         <div className="all-reviews">
//             <input
//                 type="text"
//                 placeholder="Search reviews"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//             />
//             {renderAllReviews()}
//         </div>
//     );
// }

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
