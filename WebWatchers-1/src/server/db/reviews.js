const client = require('./client');
const util = require('./utils');

//database functions
async function getAllReviews() {
    try {
        const {rows} = await client.query(`
        SELECT * FROM reviews;
        `);
        return rows;
    } catch (error) {
        throw error;
    }
}

async function getReviewById(id) {
    try {
        const {rows: [review]} = await client.query(`
        SELECT * FROM reviews
        WHERE id = $1
        `, [id]);
        return review;
    } catch (error) {
        throw error;
    }
}

async function getReviewByName(name) {
    try {
        const {rows: [review]} = await client.query(`
        SELECT * FROM reviews
        WHERE name = $1
        `, [name]);
        return review;
    } catch (error) {
        throw error;
    }
}

async function createReview({ authorid, websiteid, name, content, rating, date }) {
    try {
        const {rows: [review]} = await client.query(`
        INSERT INTO reviews(authorid, websiteid, name, content, rating, date) VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT (name) DO NOTHING
        RETURNING *
        `, [authorid, websiteid, name, content, rating, date]);
        return review;
    } catch (error) {
        throw error;
    }
}

async function updateReview({id, ...fields}){
    try {
      const toUpdate = {}
      for(let column in fields) {
        if(fields[column] !== undefined) {
            toUpdate[column] = fields[column];   
        }
      }
      let review;
      if (util.dbFields(fields).insert.length > 0) {
        const {rows} = await client.query(`
          UPDATE reviews
          SET ${ util.dbFields(toUpdate).insert }
          WHERE id=${ id }
          RETURNING *;
        `, Object.values(toUpdate));
        review = rows[0];
        return review;
      }
    } catch (error) {
      console.log("Updating review error", error);
    }
}

async function deleteReview(id) {
    try {
        const {rows: [reviews]} = await client.query(`
        DELETE FROM reviews
        WHERE id = $1
        RETURNING *;
        `, [id]);
        return reviews;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllReviews,
    getReviewById,
    getReviewByName,
    createReview,
    updateReview,
    deleteReview
}