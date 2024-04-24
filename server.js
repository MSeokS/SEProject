/*NPM Modules*/
const express = require('express');
const cors = require('cors');

/*User Modules*/
const db = require('./DBconfig');

/*express config*/
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : true }));









app.listen(port, () => {
    console.log("app listening on port ", port);
});
