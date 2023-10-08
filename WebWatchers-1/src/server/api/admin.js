const express = require('express');
const adminRouter = express.Router();
const jwt = require('jsonwebtoken');
const { JWT_SECRET = 'secretpass123' } = process.env;

const {
    getAdmin,
    getAllAdmin,
    getAllWebsites,
    createWebsite,
    updateWebsite,
    getWebsiteById,
    deleteWebsite, 
    getWebsiteByName,
    getAllUsers,
} = require('../db');


adminRouter.get('/', async( req, res, next) => {
    try {
        const admin = await getAllAdmin();

        res.send({
            admin
        });
    } catch (error) {
        console.log("Error getting all admin!", error);
        next(error)
    }
});

adminRouter.get('/users', async( req, res, next) => {
    try {
        const users = await getAllUsers();

        res.send({
            users
        });
    } catch (error) {
        console.log("Error getting all users!", error);
        next(error)
    }
});

adminRouter.get('/websites', async( req, res, next) => {
    try {
        const admin = await getAllWebsites();

        res.send({
            admin
        });
    } catch (error) {
        console.log("Error getting all websites!", error);
        next(error)
    }
});

adminRouter.post('/websites', async (req, res, next) => {
  try {
      const {name, url, description, image} = req.body;
      console.log("req body", req.body);
      const existingWebsite = await getWebsiteByName(name);
      const createdWebsite = await createWebsite({name, url, description, image});
      if(existingWebsite) {
        next({
          name: 'NotFound',
          message: `A website with name ${name} already exists`
        });
      } else {
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
      console.log("Error creating website!", error);
    }
});

adminRouter.patch('/websites/:websiteId', async (req, res, next) => {
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
        const updatedWebsite = await updateWebsite({id: websiteId, name, description, url, image});
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

adminRouter.delete('/websites/:websiteId', async (req, res, next) => {
  try {
    const {websiteId} = req.params;
    const websiteToUpdate = await getWebsiteById(websiteId);
    if(!websiteToUpdate) {
      next({
        name: 'NotFound',
        message: `No website by ID ${websiteId}`
      })
    } else {
      const deletedWebsite = await deleteWebsite(websiteId)
      res.send({success: true, ...deletedWebsite});
    }
  } catch (error) {
    console.log("delete website", error);
    next(error);
  }
});

adminRouter.post('/login', async(req, res, next) => {
    try {
        const {username, password, secret} = req.body;
        console.log("req body", req.body);
        if(!username || !password || !secret) {
            next({
                name: 'MissingCredentialsError',
                message: 'Please supply both an username, password and secret key.'
            });
        }
        const admin = await getAdmin({username, password, secret});
        console.log("admin router", admin);
        if(!admin) {
            next({
                name: 'IncorrectCredentialsError',
                message: 'Username, password or secret key is incorrect',
            })
        } else {
            const token = jwt.sign({id: admin.id, username: admin.username}, JWT_SECRET, { expiresIn: '1w'});
            res.send({ admin, message: "You're logged in!", token});
        }
    } catch(error) {
        console.log("admin error", error);
        next(error);
    }
});

module.exports = adminRouter;