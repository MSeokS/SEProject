const { Client } = require("pg");
require('dotenv').config();

const db = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
});

/*Database Connect*/
db.connect((err) => {
    if(err) throw err;
    console.log('DB is Connected');
});

module.exports = db;
