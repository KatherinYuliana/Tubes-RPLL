const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const pool = require('../db');
// const authMiddleware = require('./authMiddleware');
const authMiddleware = require('./authMiddleware');

const SECRET = 'rahasia123'; // Ganti dengan secret yang lebih aman

// router.use(authMiddleware);
// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password]);

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Email tidak ditemukan' });
    }

    const user = result.rows[0];

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

// Get user profile
router.get('/profile', authMiddleware, async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token tidak ada atau format salah' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SECRET); // Pastikan SECRET sama seperti saat login
    const result = await pool.query(
      'SELECT username, email, image_profile, balance FROM users WHERE id_user = $1',
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


// POST user
router.post('/register', async (req, res) => {
  const { username, email, password, image_profile } = req.body;

  try {
    // Cek apakah email sudah terdaftar
    const check = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (check.rows.length > 0) {
      return res.status(400).json({ message: 'Email sudah terdaftar' });
    }

    // Insert user baru dan kembalikan id_user
    const result = await pool.query(
      'INSERT INTO users (username, email, password, image_profile) VALUES ($1, $2, $3, $4) RETURNING id_user',
      [username, email, password, image_profile]
    );

    const user = result.rows[0];

    // Generate token
    const token = jwt.sign({ id_user: user.id_user }, SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;