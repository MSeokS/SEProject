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

    let positionStr;
    switch (position) {
        case 0:
            positionStr = "front_req";
            break;
        case 1:
            positionStr = "back_req";
            break;
        case 2:
            positionStr = "design_req";
            break;
        default:
            return res.status(400).json({ message: 'position error' });
    }

    await db.query("UPDATE * FROM posts SET isend = true WHERE enddate < NOW()::Date")

    const query = {
        text: "SELECT * FROM posts WHERE " + positionStr + " > 0 AND (stack | $1) > 0 AND isEnd = $2",
        values: [stack, status]
    }
    const result = await db.query(query);

    return res.send(result.rows)
});

/* Post page */
app.post('/api/post', auth, async (req, res) => {
    const { postid } = req.body;

    await db.query("UPDATE * FROM posts SET isend = true WHERE enddate < NOW()::Date");

    const query = {
        text: "SELECT * FROM posts WHERE postid = $1",
        values: [postid]
    }
    const result = await db.query(query);

    return res.send(result.rows[0]);
});


/* Evaluate Page */
app.post('/api/end_post', auth, async (req, res) => {
    const { postid, id } = req.body;

    const userid_query = {
         text: "SELECT u.* FROM users u JOIN teams t ON t.postid = $1 WHERE (u.id NOT IN (SELECT e.teamid FROM evaluate e WHERE e.userid = $2)) AND u.id != $2",
         values: [postid, id]
    }
    const result = await db.query(userid_query);
    return res.send(result);
}


/* Post apply */
app.post('/api/apply', auth, async (req, res) => {
    const { id, postid, position } = req.body;

    const query = {
        text: "INSERT INTO applicants VALUES ($1, $2, $3)",
        values: [postid, id, position]
    };
    await db.query(query);

    const query2 = {
        text: "INSERT INTO apply_post VALUES ($1, $2)",
        values: [id, postid]
    };
    await db.qeury(query2);

    return res.status(200).json({ message: 'apply success.' });
});

/* Evaluate submit */
app.post('/api/evaluate', auth, async (req, res) => {
    const {userid, perform, commute, prepare, commitment} = req.body;

    const query = {
        text: "SELECT * FROM users WHERE userid = $1",
        values: [userid]
    }
    const result = await db.query(query);

    result[0].total += 1;
    result[0].perform += perform;
    result[0].commute += commute;
    result[0].prepare += prepare;
    result[0].commitment += commitment;

    const query2 = {
        text: "UPDATE users SET total = $1, perform = $2, commute = $3, prepare = $4, commitment = $5 WHERE userid = $6",
        values: [total, preform, commute, prepare, commitment]
    };
    await db.query(query2);

    return res.status(200).json({message: 'success evaluate."};
}

/* React routing */
app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/test/login.html'));
});

app.listen(port, () => {
    console.log("app listening on port ", port);
});
