/* NPM Modules */
const express = require('express');
const cors = require('cors');
const path = require('path');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

/* User Modules */
const db = require('./modules/DBconfig');
const { login, auth } = require('./modules/JWTauth');

/* express config */
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : true }));
app.use(express.static(__dirname + ''));
app.use(cookieParser());

/* Database Connect */
db.connect((err) => {
    if(err) throw err;
    console.log('DB is Connected');
});

/* SignUp */
app.post('/api/signup', async (req, res, next) => {      // id 중복 확인
    const {username, id, password, phone, department} = req.body;
    
    const query = {
        text: "SELECT * FROM users WHERE id = $1",
        values: [id],
    };
    const result = await db.query(query);

    if(result.rows.length > 0) {
        return res.status(400).json({ message: 'studentid already exists' });
    } else {
        return next();
    }
});

app.post('/api/signup', async (req, res) => {      // id 생성
    const {username, id, password, department, phone} = req.body;

    const query = {
        text: "INSERT INTO users VALUES ($1, $2, $3, $4, $5)",
        values: [username, id, password, phone, department],
    }
    const result = await db.query(query);

    return res.status(200).json({ message: 'Success create new account' });
});

/* SignIn */
app.post('/api/signin', login, async (req, res) => {
    const {id, password} = req.body;
    
    const query = {
        text: "SELECT * FROM users WHERE id = $1 AND password = $2",
        values: [id, password]
    };
    const result = await db.query(query);
    
    if(result.rows.length == 0) {
        return res.status(400).json({ message: 'Signin failed.' });
    } else {
        const payload = {
            id,
        }
        jwt.sign(payload, process.env.KEY, {expiresIn: 3600}, (err, token) => {
            if(err) throw err;
            else
                return res
                .cookie('user', token, {maxAge: 30*60*1000})
                .end();
        });
    }
});

/*Logout to develop*/
app.get('/logout', (req, res) => {
    return res
    .clearCookie('user', {path: '/'})
    .end();
});

/* Main page search */
app.post('/api/search', auth, async (req, res) => {
    const { status, position, stack } = req.body;

    position += "_req";

    await db.query("UPDATE * FROM posts SET isend = true WHERE enddate < NOW()::Date")

    const query = {
        text: "SELECT * FROM posts WHERE $1 > 0 AND (stack | $2) > 0 AND isEnd = $3",
        values: [position, stack, status]
    }
    const result = await db.query(query);

    return res.send(result.rows)
});

/* Post page */
app.post('/api/post', auth, async (req, res) => {
    const { postid } = req.body;

    await db.query("UPDATE * FROM posts SET isend = true WHERE enddate < NOW()::Date")

    const query = {
        text: "SELECT * FROM posts WHERE postid = $1",
        values: [postid]
    }
    const result = await db.query(query);

    const now = new Date();
    if (result.rows[0].isEnd == true) {
        const userid_query = {
            text: "SELECT userid FROM teams WHERE postid = $1",
            values: [postid]
        }
        const teams = await db.query(userid_query);
        return res.send(teams);
    }

    return res.send(result.rows[0]);
});

/* React routing */
app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/test/login.html'));
});

app.listen(port, () => {
    console.log("app listening on port ", port);
});
