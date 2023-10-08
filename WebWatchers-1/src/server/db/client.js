const { Client } = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgresql://localhost:5432/parent'; //'postgresql://localhost:5432/parent'

const db = new Client({
    connectionString,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
});

module.exports = db;