const express = require('express');
const router = express.Router();
const pool = require('../db');

// POST user
router.post('/', async (req, res) => {
  const { username, email, password } = req.body;
  await pool.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3)', [username, email, password]);
  res.json({ message: 'User added' });
});

module.exports = router;