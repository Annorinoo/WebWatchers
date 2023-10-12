const db = require('./client');
const bcrypt = require('bcrypt');
const SALT_COUNT = 10;

const createUser = async({ name, username, password }) => {
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
    try {
        const { rows: [user] } = await db.query(`
        INSERT INTO users(name, username, password)
        VALUES($1, $2, $3)
        ON CONFLICT (username) DO NOTHING
        RETURNING name, username
        `, [name, username, hashedPassword]);
        return user;
    } catch (err) {
        throw err;
    }
}

const getUser = async(username, password) => {
    if(!username || !password) {
        return;
    }
    try {
        const user = await getUserByUsername(username);
        if(!user) return;
        const hashedPassword = user.password;
        const passwordsMatch = await bcrypt.compare(password, hashedPassword);
        if(!passwordsMatch) return;
        delete user.password;
        return user;
    } catch (err) {
        console.log(err);
    }
}

const getUserByUsername = async(username) => {
    try {
        const { rows: [ user ] } = await db.query(`
        SELECT * 
        FROM users
        WHERE username=$1
        `, [ username ]);

        if(!user) {
            throw {
                name: "UserNotFoundError",
                message: "A user with that username does not exist."
            }
        }
        return user;
    } catch (err) {
        throw err;
    }
}

const getUserById = async(id) => {
    try {
        const { rows: [ user ] } = await db.query(`
        SELECT * 
        FROM users
        WHERE id=$1;`, [ id ]);

        if(!user) {
            return;
        }
        return user;
    } catch (err) {
        throw err;
    }
}

async function getAllUsers() {
    try {
        const {rows} = await db.query(`
        SELECT * FROM users;
        `);
        return rows;
    } catch (error) {
        throw error;
    }
}

const getUserByInfo = async () => {
    try {
      const { rows } = await db.query(`
        SELECT * FROM users;
      `);
      return rows;
    } catch (error) {
      throw error;
    }
  };

module.exports = {
    createUser,
    getUser,
    getUserByUsername,
    getUserById,
    getAllUsers,
    getUserByInfo
};