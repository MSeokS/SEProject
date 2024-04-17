/*NPM Modules*/
const express = require('express');
const cors = require('cors');

/*User Modules*/
const db = require('./DBconfig');

/*express config*/
const app = express();
const port = 3000;

app.use(cors());

/*Database Connect*/
db.connect((err) => {
    if(err) throw err;
    console.log('DB is Connected');
});
;
