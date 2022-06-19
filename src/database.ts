import pg from 'pg';

require('dotenv').config();

const client = new pg.Client(process.env.DATABASE_URL);

module.exports = client;

