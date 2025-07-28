const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const pool = require('../db');
const SECRET = 'rahasia123'; // Ganti dengan secret yang lebih aman

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password]);

    console.log('Email input:', email);
    // console.log('Username input:', username);
console.log('Password input:', password);
// console.log('User from DB:', user);

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Email tidak ditemukan' });
    }

    const user = result.rows[0];
    console.log('User from DB:', user);

    // Tidak pakai bcrypt
    if (user.password !== password) {
      return res.status(401).json({ message: 'Password salah' });
    }

    const token = jwt.sign({ id_user: user.id_user }, SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/profile', async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token tidak ada atau format salah' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SECRET); // Pastikan SECRET sama seperti saat login
    const result = await pool.query(
      'SELECT username, email, image_profile FROM users WHERE id_user = $1',
      [decoded.id_user]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User tidak ditemukan' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("JWT Error:", err);
    res.status(403).json({ message: 'Token tidak valid' });
  }
});


// // POST user
// router.post('/', async (req, res) => {
//   const { username, email, password } = req.body;
//   await pool.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3)', [username, email, password]);
//   res.json({ message: 'User added' });
// });

module.exports = router;