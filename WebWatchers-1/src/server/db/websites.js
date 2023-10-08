const db = require('./client');
const util = require('./utils');

//database functions 
async function getAllWebsites() {
    try {
        const {rows} = await db.query(`
        SELECT * FROM websites;
        `);
        return rows;
    } catch (error) {
        throw error;
    }
}

async function getWebsiteById(id) {
    try {
        const {rows: [website]} = await db.query(`
        SELECT * from websites
        WHERE id = $1
        `, [id]);
        return website;
    } catch (error) {
        throw error;
    }
}

async function getWebsiteByName(name) {
    try {
        const {rows: [website]} = await db.query(`
        SELECT * FROM websites
        WHERE name = $1
        `, [name]);
        return website;
    } catch (error) {
        throw error;
    }
}

async function createWebsite({ name, url, description, image }) {
 try {
  const {rows: [website]} = await db.query(`
    INSERT INTO websites(name, url, description, image) 
    VALUES ($1, $2, $3, $4)
    ON CONFLICT (name) DO NOTHING
    RETURNING *
  `, [name, url, description, image])
  console.log("db websites", website);
  return website;
 } catch (error) {
  console.log("Error creating website!", error);
 }
}

async function updateWebsite({id, ...fields}){
  try {
    const toUpdate = {}
    for(let column in fields) {
      if(fields[column] !== undefined) {
      toUpdate[column] = fields[column];
      }
    }
    let website;
    if (util.dbFields(toUpdate).insert.length > 0) {
      const {rows} = await db.query(`
        UPDATE websites
        SET ${ util.dbFields(toUpdate).insert }
        WHERE id=${ id }
        RETURNING *;
      `, Object.values(toUpdate));
      website = rows[0];
    }
    return website;
  } catch (error) {
    console.log("Error updating website", error);
  }
}

async function deleteWebsite(id) {
    try {
        const {rows: [websites]} = await db.query(`
        DELETE FROM websites
        WHERE id = $1
        RETURNING *;
        `, [id]);
        return websites;
    } catch (error) {
        throw error;
    }
}



module.exports = {
    getAllWebsites,
    getWebsiteById,
    getWebsiteByName,
    createWebsite,
    updateWebsite,
    deleteWebsite,
}