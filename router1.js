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
    res.status(400).json({ meessage: 'scrab_post failed' });
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
    res.status(400).json({ meessage: 'profile failed' });
  }
});

module.exports = router;