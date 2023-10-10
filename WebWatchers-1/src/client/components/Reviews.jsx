// v1.0
// import React, { useState, useEffect } from "react";
// import { fetchAllReviews, deleteReview } from "../API/ajaxHelper";
// // import "../Style/Reviews.css";

// export default function Reviews() {
//     const [reviews, setReviews] = useState([]);
//     const [thumbsUp, setThumbsUp] = useState({});
//     const [thumbsDown, setThumbsDown] = useState({});
//     const [searchQuery, setSearchQuery] = useState(""); // Step 1: Add state for the search query

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

//     const handleThumbsUp = (reviewId) => {
//         setThumbsUp((prevThumbsUp) => ({
//             ...prevThumbsUp,
//             [reviewId]: prevThumbsUp[reviewId] + 1,
//         }));
//     };

//     const handleThumbsDown = (reviewId) => {
//         setThumbsDown((prevThumbsDown) => ({
//             ...prevThumbsDown,
//             [reviewId]: prevThumbsDown[reviewId] + 1,
//         }));
//     };

//     const renderAllReviews = () => {
//         // Step 2: Modify this function to filter reviews based on the search query
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

//     async function handleDelete(reviewId) {
//         try {
//             await deleteReview(reviewId);
//             const updatedReviews = await fetchAllReviews();
//             setReviews(updatedReviews.reviews);
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
//                 onChange={(e) => setSearchQuery(e.target.value)} // Step 4: Attach onChange event handler
//             />
//             {renderAllReviews()}
//         </div>
//     );
// }

//v1.1
import React, { useState, useEffect } from "react";
import { fetchAllReviews, deleteReview } from "../API/ajaxHelper";
// import "../Style/Reviews.css";

export default function Reviews({ user }) {
    const [reviews, setReviews] = useState([]);
    const [thumbsUp, setThumbsUp] = useState({});
    const [thumbsDown, setThumbsDown] = useState({});
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        async function allReviewsHandler() {
            try {
                const result = await fetchAllReviews();
                setReviews(result.reviews);

                // Initialize the thumbs up and thumbs down state for each review
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
        if (!user) {
            // User not logged in, show a message or prevent voting
            alert("You must be logged in to vote.");
            return;
        }

        if (hasUserVoted(user.id, reviewId, "thumbsUp")) {
            // User has already voted, show a message or prevent voting
            alert("You have already voted on this review.");
            return;
        }

        setThumbsUp((prevThumbsUp) => ({
            ...prevThumbsUp,
            [reviewId]: prevThumbsUp[reviewId] + 1,
        }));

        // Remember that the user has voted on this review
        markUserVoted(user.id, reviewId, "thumbsUp");
    };

    const handleThumbsDown = (reviewId) => {
        if (!user) {
            // User not logged in, show a message or prevent voting
            alert("You must be logged in to vote.");
            return;
        }

        if (hasUserVoted(user.id, reviewId, "thumbsDown")) {
            // User has already voted, show a message or prevent voting
            alert("You have already voted on this review.");
            return;
        }

        setThumbsDown((prevThumbsDown) => ({
            ...prevThumbsDown,
            [reviewId]: prevThumbsDown[reviewId] + 1,
        }));

        // Remember that the user has voted on this review
        markUserVoted(user.id, reviewId, "thumbsDown");
    };

    // Helper functions to check and record user votes
    const hasUserVoted = (userId, reviewId, voteType) => {
        // You can implement this logic using local storage or a server-side database
        // For example, you can store user votes in local storage as a JSON object
        // and check if the user has already voted for a specific review.
        const userVotes = JSON.parse(localStorage.getItem("userVotes")) || {};

        if (userVotes[userId] && userVotes[userId][reviewId]) {
            return userVotes[userId][reviewId] === voteType;
        }

        return false;
    };

    const markUserVoted = (userId, reviewId, voteType) => {
        // You can implement this logic to record user votes in local storage
        // or send a request to the server to update the user's vote in a database.
        const userVotes = JSON.parse(localStorage.getItem("userVotes")) || {};

        if (!userVotes[userId]) {
            userVotes[userId] = {};
        }

        userVotes[userId][reviewId] = voteType;
        localStorage.setItem("userVotes", JSON.stringify(userVotes));
    };

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
                    <button onClick={() => handleDelete(review.id)}>Delete</button>
                </div>
            </div>
        ));
    };

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
