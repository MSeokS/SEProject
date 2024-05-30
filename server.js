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
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + ''));
app.use(cookieParser());

/* Database Connect */
db.connect((err) => {
  if (err) throw err;
  console.log('DB is Connected');
});

/* SignUp */
app.post('/api/signup', async (req, res, next) => {
  // id 중복 확인
  const { username, id, password, phone, department } = req.body;

  const query = {
    text: 'SELECT * FROM users WHERE id = $1',
    values: [id],
  };
  const result = await db.query(query);

  if (result.rows.length > 0) {
    return res.status(400).json({ message: 'studentid already exists' });
  } else {
    return next();
  }
});

app.post('/api/signup', async (req, res) => {
  // id 생성
  const { username, id, password, department, phone } = req.body;

  const query = {
    text: 'INSERT INTO users VALUES ($1, $2, $3, $4, $5)',
    values: [username, id, password, phone, department],
  };
  const result = await db.query(query);

  return res.status(200).json({ message: 'Success create new account' });
});

/* SignIn */
app.post('/api/signin', login, async (req, res) => {
  const { id, password } = req.body;

  const query = {
    text: 'SELECT * FROM users WHERE id = $1 AND password = $2',
    values: [id, password],
  };
  const result = await db.query(query);

  if (result.rows.length == 0) {
    return res.status(400).json({ message: 'Signin failed.' });
  } else {
    const payload = {
      id,
    };
    jwt.sign(payload, process.env.KEY, { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      else return res.cookie('user', token, { maxAge: 30 * 60 * 1000 }).end();
    });
  }
});

/*Logout to develop*/
app.get('/logout', (req, res) => {
  return res.clearCookie('user', { path: '/' }).end();
});

/* Main page search */
app.post('/api/search', auth, async (req, res) => {
  const { status, position, stack } = req.body;

  let positionStr;
  switch (position) {
    case 0:
      positionStr = 'front_req';
      break;
    case 1:
      positionStr = 'back_req';
      break;
    case 2:
      positionStr = 'design_req';
      break;
    default:
      return res.status(400).json({ message: 'position error' });
  }

  await db.query(
    'UPDATE * FROM posts SET isend = true WHERE enddate < NOW()::Date'
  );

  const query = {
    text:
      'SELECT * FROM posts WHERE ' +
      positionStr +
      ' > 0 AND (stack | $1) > 0 AND isEnd = $2',
    values: [stack, status],
  };
  const result = await db.query(query);

  return res.send(result.rows);
});

/* Post page */
app.post('/api/post', auth, async (req, res) => {
  const { postid } = req.body;

  await db.query(
    'UPDATE * FROM posts SET isend = true WHERE enddate < NOW()::Date'
  );

  const query = {
    text: 'SELECT * FROM posts WHERE postid = $1',
    values: [postid],
  };
  const result = await db.query(query);

  const now = new Date();
  if (result.rows[0].isEnd == true) {
    const userid_query = {
      text: 'SELECT userid FROM teams WHERE postid = $1',
      values: [postid],
    };
    const teams = await db.query(userid_query);
    return res.send(teams);
  }

  return res.send(result.rows[0]);
});

/* Post apply */
app.post('/api/apply', auth, async (req, res) => {
  const { id, postid, position } = req.body;

  const query = {
    text: 'INSERT INTO applicants VALUES ($1, $2, $3)',
    values: [id, postid, position],
  };
  await db.query(query);

  return res.status(200).json({ message: 'apply success.' });
});

app.post('/api/scrab_post', auth, async (req, res) => {
  //   console.log(req.cookies);
  //   console.log(req.body);
  const id = req.body.id;

  const query = {
    text: 'SELECT * FROM apply_post WHERE userid = $1',
    values: [id],
  };

  try {
    const result = await db.query(query);

    let postsId = [];
    result.rows.map((post) => {
      postsId.push(post.postid);
    });

    const ids = postsId.map(String).join(', ');
    const query2 = {
      text: `SELECT * FROM posts WHERE id IN (${ids})`,
    };

    const posts_result = await db.query(query2);

    res.status(200).json({ posts: posts_result.rows });
  } catch (error) {
    console.error(error);
    res.status(400).json({ meessage: 'scrab_post failed' });
  }
});

app.post('/api/profile', auth, async (req, res) => {
  const id = req.body.id;

  const query = {
    text: 'SELECT perform, commute, prepare, commitment, total FROM users WHERE id = $1',
    values: [id],
  };

  try {
    const query_result = await db.query(query);
    const scores = query_result.rows[0];
    const score =
      scores.perform + scores.commute + scores.prepare + scores.commitment;
    const evaluate = parseFloat((score / (scores.total * 4)).toFixed(1));

    // console.log(evaluate);

    res.status(200).json({ evaluate_average: evaluate });
  } catch (error) {
    console.error(error);
    res.status(400).json({ meessage: 'profile failed' });
  }
});

/* React routing */
// app.use('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '/test/login.html'));
// });

app.listen(port, () => {
  console.log('app listening on port ', port);
});
