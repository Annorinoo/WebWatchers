const express = require('express');
const reviewsRouter = express.Router(); 
const websitesRouter = express.Router(); 
const { requireUser, requiredNotSent } = require('./utils')

const {
    getAllReviews,
    getReviewById,
    getReviewByName,
    createReview,
    deleteReview,
    updateReview,
} = require('../db');


reviewsRouter.get('/', async(req, res, next) => {
    try {
        const reviews = await getAllReviews();

        res.send({
            reviews
        });
    } catch (error) {
        next(error)
    }
})

reviewsRouter.get('/:id', async(req, res, next) => {
    try {
        const review = await getReviewById(req.params.id);

        res.send({
            review
        });
    } catch (error) {
        next(error)
    }
})

reviewsRouter.get('/name', async(req, res, next) => {
    try {
        const review = await getReviewByName();

        res.send({
            review
        });
    } catch (error) {
        next(error)
    }
})

reviewsRouter.get("/:websiteName", async (req, res) => {
  const websiteId = req.params.websiteId;
  
  try {
    const reviews = await getReviewsByWebsiteName(websiteName);
    res.json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
});

// Ann's reviewsRouter.post
// reviewsRouter.post('/', requireUser, requiredNotSent({ requiredParams: ['name', 'content', 'rating', 'date', 'websiteName'] }), async (req, res, next) => {
//   try {
//       const { name, content, rating, date, websiteName } = req.body;

//       // Assuming you have user authentication in place, get the user's ID from the authentication data.
//       const authorId = req.user.id; // Replace with the actual way you get the user's ID.

//       // Determine the website ID based on the website name in the request body.
//       // You can perform a database query to find the website ID.
//       const websiteId = await getWebsiteIdByName(websiteName); // Implement this function to fetch the website ID.

//       if (!websiteId) {
//           // Handle the case where the website name doesn't exist in the database.
//           return res.status(404).json({ message: 'Website not found' });
//       }

//       // Create the review with the retrieved authorid and websiteid.
//       const createdReview = await createReview({ authorid: authorId, websiteid: websiteId, name, content, rating, date });

//       if (createdReview) {
//           res.send(createdReview);
//       } else {
//           next({
//               name: 'FailedToCreate',
//               message: 'There was an error creating your review'
//           });
//       }
//   } catch (error) {
//       // Log the error to help diagnose any issues.
//       console.error(error);
//       next(error);
//   }
// });

reviewsRouter.post('/', requireUser, requiredNotSent({ requiredParams: ['name', 'content', 'rating'] }), async (req, res, next) => {
  try {
    const { name, content, rating } = req.body;
    const { reviewId } = req.params;
    
    // Generate the current date
    const date = new Date().toISOString();
    
    const existingReview = await getReviewById(reviewId);

    if (existingReview) {
      next({
        name: 'NotFound',
        message: `A review with Id ${reviewId} already exists`
      });
    } else {
      const createdReview = await createReview({
        authorid: req.user.id,
        name,
        content,
        rating,
        date, // Use the generated date
      });

      if (createdReview) {
        res.send(createdReview);
      } else {
        next({
          name: 'FailedToCreate',
          message: 'There was an error creating your review'
        });
      }
    }
  } catch (error) {
    next(error);
  }
});



reviewsRouter.patch('/:reviewId', requireUser, requiredNotSent({requiredParams: ['name', 'content', 'rating', 'date'], atLeastOne: true}), async (req, res, next) => {
  try {
    const {name, content, rating, date} = req.body;
    const {reviewId} = req.params;
    const reviewToUpdate = await getReviewById(reviewId);
    if(!reviewToUpdate) {
      next({
        name: 'NotFound',
        message: `No review by ID ${reviewId}`
      })

      console.log(reviewId);

    } else if(req.user.id !== reviewToUpdate.authorid) {
      res.status(403);
      next({
        name: "WrongUserError",
        message: "You must be the same user who created this review to perform this action"
      });
    } else {
      const updatedReview = await updateReview({reviewId, authorid: req.user.id, name, content, rating, date});
      if(updatedReview) {
        res.send(updatedReview);
      } else {
        next({
          name: 'FailedToUpdate',
          message: 'There was an error updating your review'
        })
      }
    }
  } catch (error) {
    console.log("updating review error", error);
    next(error);
  }
});

reviewsRouter.delete('/:reviewId', requireUser, async (req, res, next) => {
  try {
    const reviewToUpdate = await getReviewById(req.params.reviewId);
    console.log('review to update', reviewToUpdate);
    console.log('req user id', req.user.id);
    if(!reviewToUpdate) {
      next({
        name: 'NotFound',
        message: `No review by ID ${reviewId}`
      })
    } else if(req.user.id !== reviewToUpdate.authorid) {
      res.status(403);
      next({
        name: "WrongUserError",
        message: "You must be the same user who created this review to perform this action"
      });
    } else {
      const deletedReview = await deleteReview(req.params.reviewId)
      res.send({success: true, ...deletedReview});
    }
  } catch (error) {
    console.log("delete review error", error)
    next(error);
  }
});

module.exports = reviewsRouter;