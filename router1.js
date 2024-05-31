const express = require('express');
const { login, auth } = require('./modules/JWTauth');
const db = require('./modules/DBconfig');

const router = express.Router();

router.post('/api/scrab_post', auth, async (req, res) => {
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
    res.status(400).json({ message: 'scrab_post failed' });
  }
});

router.post('/api/profile', auth, async (req, res) => {
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
    res.status(400).json({ message: 'profile failed' });
  }
});

router.post('/api/account', auth, async (req, res) => {
  const id = req.body.id;

  const query = {
    text: 'SELECT * FROM users WHERE id = $1',
    values: [id],
  };

  try {
    const query_result = await db.query(query);
    const user = query_result.rows;

    // console.log(user);

    res.status(200).json({ user: user[0] });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'account failed' });
  }
});

router.post('/api/save', auth, async (req, res) => {
  // const { username, password, phone, department } = req.body;
  const id = req.body.id;
  const filteredData = Object.fromEntries(
    Object.entries(req.body).filter(
      ([key, value]) => value !== undefined && key != 'id'
    )
  );

  const setClause = Object.entries(filteredData)
    .map(([key, value]) => `${key} = '${value}'`)
    .join(', ');

  console.log(setClause);

  const query = `UPDATE users SET ${setClause} WHERE id = '${id}'`;
  console.log(query);

  try {
    const query_result = await db.query(query);
    console.log(query_result.rows);

    res.status(200).json({ message: 'save success' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'save failed' });
  }
});

router.post('/api/portfolio', auth, async (req, res) => {
  const id = req.body.id;

  const query = {
    text: 'SELECT * FROM users WHERE id = $1',
    values: [id],
  };

  try {
    const query_result = await db.query(query);
    const user = query_result.rows;

    // console.log(user);

    res.status(200).json({ user: user[0] });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'portfolio failed' });
  }
});

router.post('/api/save_portfoilo', auth, async (req, res) => {
  const { id, position, stack, profile_text } = req.body;

  const query = {
    text: 'UPDATE users SET position = $1, stack = $2, profile = $3 WHERE id = $4',
    values: [position, stack, profile_text, id],
  };

  try {
    const query_result = await db.query(query);

    res.status(400).json({ message: 'save_portfolio success' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'save_portfolio failed' });
  }
});

router.post('/api/mypost', auth, async (req, res) => {
  const id = req.body.id;
  const query = `SELECT * FROM posts WHERE userid='${id}'`;

  try {
    const query_result = await db.query(query);
    const posts = query_result.rows;
    console.log(posts);

    res.status(200).json({ posts: query_result.rows });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'mypost failed' });
  }
});

module.exports = router;
