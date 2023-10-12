// import React, { useState, useEffect } from "react";
// import { fetchAllReviews, editReview } from "../API/ajaxHelper"; // You may need to implement the editReview function
// import jwt_decode from 'jwt-decode';

// export default function Profile() {
//   const token = localStorage.getItem('token');
//   const [username, setUsername] = useState('');
//   const [id, setId] = useState('');
//   const [reviews, setReviews] = useState([]);

//   useEffect(() => {
//     if (token) {
//       try {
//         const decodedToken = jwt_decode(token);
//         setUsername(decodedToken.username);
//         setId(decodedToken.id);

//         fetchAllReviews()
//           .then((allReviews) => {
//             const filteredReviews = allReviews.reviews.filter(
//               (review) => review.authorid === decodedToken.id
//             );
//             setReviews(filteredReviews);
//           })
//           .catch((error) => {
//             console.error("Error fetching reviews:", error);
//           });
//       } catch (error) {
//         console.error("Error decoding token:", error);
//       }
//     }
//   }, [token]);

//   const [editedReviews, setEditedReviews] = useState({}); // To track which reviews are being edited

//   const handleEdit = (reviewId) => {
//     // Update the state to indicate that this review is being edited
//     setEditedReviews({ ...editedReviews, [reviewId]: true });
//   };

//   const handleSave = (reviewId) => {
//     // You would typically send an API request to update the review here
//     // For this example, we're just updating the state
//     const updatedReviews = reviews.map((review) => {
//       if (review.id === reviewId) {
//         return { ...review, content: editedReviews[reviewId] };
//       }
//       return review;
//     });
//     setReviews(updatedReviews);

//     // Reset the edit status for this review
//     setEditedReviews({ ...editedReviews, [reviewId]: false });
//   };

//   const renderReviews = () => {
//     if (reviews.length > 0) {
//       return (
//         <div className="reviews">
//           <h2>Reviews:</h2>
//           <ul>
//             {reviews.map((review) => (
//               <li key={review.id}>
//                 <h3>{review.name}</h3>
//                 {editedReviews[review.id] ? (
//                   // If the review is being edited, show an input field for editing
//                   <div>
//                     <input
//                       type="text"
//                       value={editedReviews[review.id]}
//                       onChange={(e) =>
//                         setEditedReviews({
//                           ...editedReviews,
//                           [review.id]: e.target.value,
//                         })
//                       }
//                     />
//                     <button onClick={() => handleSave(review.id)}>Save</button>
//                   </div>
//                 ) : (
//                   // If the review is not being edited, show the content
//                   <p>{review.content}</p>
//                 )}
//                 <p>Rating: {review.rating}</p>
//                 <p>Date: {new Date(review.date).toLocaleDateString()}</p>
//                 {editedReviews[review.id] ? (
//                   // Show the "Cancel" button during edit
//                   <button onClick={() => setEditedReviews({ ...editedReviews, [review.id]: false })}>Cancel</button>
//                 ) : (
//                   // Show the "Edit" button when not in edit mode
//                   <button onClick={() => handleEdit(review.id)}>Edit</button>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </div>
//       );
//     } else {
//       return <p>No reviews available.</p>;
//     }
//   };

//   return (
//     <div className="panel">
//       <h1>Welcome {username}!</h1>
//       <h2>Your current id is {id}!</h2>
//       <div className="filtered-reviews-container">
//         {renderReviews()}
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { fetchAllReviews, editReview } from "../API/ajaxHelper";
import jwt_decode from 'jwt-decode';

export default function Profile() {
  const token = localStorage.getItem('token');
  const [username, setUsername] = useState('');
  const [id, setId] = useState('');
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwt_decode(token);
        setUsername(decodedToken.username);
        setId(decodedToken.id);

        fetchAllReviews()
          .then((allReviews) => {
            const filteredReviews = allReviews.reviews.filter(
              (review) => review.authorid === decodedToken.id
            );
            setReviews(filteredReviews);
          })
          .catch((error) => {
            console.error("Error fetching reviews:", error);
          });
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, [token]);

  const [editedReviews, setEditedReviews] = useState({});

  const handleEdit = (reviewId) => {
    // Update the state to indicate that this review is being edited
    setEditedReviews({ ...editedReviews, [reviewId]: reviews.find(review => review.id === reviewId) });
  };

  const handleSave = async (reviewId) => {
    try {
      const editedReview = editedReviews[reviewId];

      // Send the edited review to the server
      await editReview(reviewId, editedReview.name, editedReview.content, editedReview.rating, editedReview.date);

      // Update the state with the edited content
      const updatedReviews = reviews.map((review) => {
        if (review.id === reviewId) {
          return { ...review, name: editedReview.name, content: editedReview.content };
        }
        return review;
      });
      setReviews(updatedReviews);

      // Reset the edit status for this review
      setEditedReviews({ ...editedReviews, [reviewId]: false });
    } catch (error) {
      console.error("Error editing review:", error);
    }
  };

  const renderReviews = () => {
    if (reviews.length > 0) {
      return (
        <div className="reviews">
          <h2>Reviews:</h2>
          <ul>
            {reviews.map((review) => (
              <li key={review.id}>
                {editedReviews[review.id] ? (
                  <div>
                    <input
                      type="text"
                      value={editedReviews[review.id].name}
                      onChange={(e) =>
                        setEditedReviews({
                          ...editedReviews,
                          [review.id]: {
                            ...editedReviews[review.id],
                            name: e.target.value,
                          },
                        })
                      }
                    />
                    <input
                      type="text"
                      value={editedReviews[review.id].content}
                      onChange={(e) =>
                        setEditedReviews({
                          ...editedReviews,
                          [review.id]: {
                            ...editedReviews[review.id],
                            content: e.target.value,
                          },
                        })
                      }
                    />
                    <button onClick={() => handleSave(review.id)}>Save</button>
                    <button onClick={() => setEditedReviews({ ...editedReviews, [review.id]: false })}>Cancel</button>
                  </div>
                ) : (
                  <div>
                    <h3>{review.name}</h3>
                    <p>{review.content}</p>
                    <p>Rating: {review.rating}</p>
                    <p>Date: {new Date(review.date).toLocaleDateString()}</p>
                    <button onClick={() => handleEdit(review.id)}>Edit</button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      );
    } else {
      return <p>No reviews available.</p>;
    }
  };

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
