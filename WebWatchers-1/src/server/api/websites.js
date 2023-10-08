const express = require('express')
const websitesRouter = express.Router();
const { requireUser, requiredNotSent } = require('./utils')

const {
    getAllWebsites,
    getWebsiteById,
    getWebsiteByName,
    createWebsite,
    deleteWebsite,
    updateWebsite,
    createReview
} = require('../db');


websitesRouter.get('/', async(req, res, next) => {
    try {
        const websites = await getAllWebsites();

        res.send({
            websites
        });
    } catch (error) {
        next(error)
    }
})

websitesRouter.get('/:id', async(req, res, next) => {
    try {
        const website = await getWebsiteById(req.params.id);

        res.send({
            website
        });
    } catch (error) {
        next(error)
    }
})

websitesRouter.get('/name', async(req, res, next) => {
    try {
        const website = await getWebsiteByName();

        res.send({
            website
        });
    } catch (error) {
        next(error)
    }
})

websitesRouter.post('/', requireUser, requiredNotSent({requiredParams: ['name', 'description', 'url', 'image']}), async (req, res, next) => {
    try {
      const {name, description, url, image} = req.body;
      const existingWebsite = await getWebsiteByName(name);
      if(existingWebsite) {
        next({
          name: 'NotFound',
          message: `A website with name ${name} already exists`
        });
      } else {
        const createdWebsite = await createWebsite({name, description, url, image});
        if(createdWebsite) {
          res.send(createdWebsite);
        } else {
          next({
            name: 'FailedToCreate',
            message: 'There was an error creating your website'
          })
        }
      }
    } catch (error) {
      console.log("create website", error);
      next(error);
    }
});

websitesRouter.patch('/:websiteId', requireUser, requiredNotSent({requiredParams: ['name', 'description', 'url', 'image'], atLeastOne: true}), async (req, res, next) => {
  try {
    const {name, description, url, image} = req.body;
    const {websiteId} = req.params;
    const websiteToUpdate = await getWebsiteById(websiteId);
    if(!websiteToUpdate) {
      next({
        name: 'NotFound',
        message: `No website by ID ${websiteId}`
      })
    } else {
      const updatedWebsite = await updateWebsite({websiteId, name, description, url, image});
      if(updatedWebsite) {
        res.send(updatedWebsite);
      } else {
        next({
          name: 'FailedToUpdate',
          message: 'There was an error updating your website'
        })
      }
    }
  } catch (error) {
    console.log("updating website error", error);
    next(error);
  }
});


websitesRouter.delete('/:websiteId', requireUser, async (req, res, next) => {
  try {
    const websiteToUpdate = await getWebsiteById(req.params.websiteId);
    if(!websiteToUpdate) {
      next({
        name: 'NotFound',
        message: `No website by ID ${websiteId}`
      })
    } else {
      const deletedWebsite = await deleteWebsite(req.params.websiteId)
      res.send({success: true, ...deletedWebsite});
    }
  } catch (error) {
    console.log("delete website", error);
    next(error);
  }
});

// Define a route that allows posting reviews for a specific website by its ID.
websitesRouter.post('/:id', requireUser, requiredNotSent({ requiredParams: ['name', 'content', 'rating', 'date'] }), async (req, res, next) => {
  try {
      const { name, content, rating, date } = req.body;
      const websiteId = req.params.id; // Retrieve the website ID from the URL parameter.

      const authorId = req.user.id;

      // Create the review with the retrieved authorid and websiteid.
      const createdReview = await createReview({ authorid: authorId, websiteid: websiteId, name, content, rating, date });

      if (createdReview) {
          res.send(createdReview);
      } else {
          next({
              name: 'FailedToCreate',
              message: 'There was an error creating your review'
          });
      }
  } catch (error) {
      // Log the error to help diagnose any issues.
      console.error(error);
      next(error);
  }
});

module.exports = websitesRouter;
