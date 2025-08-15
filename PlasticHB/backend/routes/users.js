const express = require('express');
const multer = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken');
const router = express.Router();
const pool = require('../db');
const authMiddleware = require('./authMiddleware');

const SECRET = 'rahasia123'; // Ganti dengan secret yang lebih aman

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

// upload gambar ke folder tertentu
const uploadDir = path.join(__dirname, '../../public/Profile Picture'); // ganti sesuai folder kamu
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, file.originalname) // Simpan nama asli
});

const upload = multer({ storage });

router.post('/upload', upload.single('image_url'), (req, res) => {
  if (!req.file) return res.status(400).send('No file uploaded.');
  res.send({ filename: req.file.originalname });
});

// --- Update User Profile ---
router.put('/update_profile', authMiddleware, upload.single('image_profile'), async (req, res) => {
    const userId = req.userId;
    const { username, email } = req.body;

    if (!username || !email) {
        return res.status(400).json({ message: 'Username dan email tidak boleh kosong' });
    }

    try {
        // Ambil data user saat ini untuk mendapatkan nama file gambar lama
        const currentUser = await pool.query('SELECT image_profile FROM users WHERE id_user = $1', [userId]);

        if (currentUser.rows.length === 0) {
            return res.status(404).json({ message: 'Pengguna tidak ditemukan.' });
        }
        // 3. Tentukan nama file gambar baru
        // Jika ada file baru yang diunggah, gunakan nama file baru.
        // Jika tidak, gunakan nama file lama dari database.
        let newImageProfile = currentUser.rows[0].image_profile;
        if (req.file) {
            newImageProfile = req.file.filename;
            // Di sini Anda bisa menambahkan logika untuk menghapus file gambar lama jika perlu
        }

        // 4. Update semua data termasuk nama file gambar baru
        const result = await pool.query(
            'UPDATE users SET username = $1, email = $2, image_profile = $3 WHERE id_user = $4 RETURNING id_user, username, email, image_profile',
            [username, email, newImageProfile, userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
        }

        res.json({ message: 'Profil berhasil diperbarui', user: result.rows[0] });

    } catch (err) {
        console.error("Error saat memperbarui profil:", err);
        res.status(500).json({ message: 'Terjadi kesalahan pada server' });
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
