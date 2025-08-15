// const jwt = require('jsonwebtoken');
// const SECRET = 'rahasia123'; // Harus sama dengan yang di users.js

// module.exports = (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith('Bearer ')) {
//     return res.status(401).json({ message: 'Token tidak ada atau format salah' });
//   }

//   const token = authHeader.split(' ')[1];

//   try {
//     const decoded = jwt.verify(token, SECRET);
//     req.user = decoded; // Menambahkan user ke request object
//     next();
//   } catch (err) {
//     console.error("JWT Error:", err);
//     return res.status(403).json({ message: 'Token tidak valid' });
//   }
// };

const jwt = require('jsonwebtoken');
const SECRET = 'rahasia123'; // Pastikan secret ini SAMA PERSIS dengan yang di users.js

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Akses ditolak. Token tidak ada atau format salah.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SECRET);

    // Ini adalah bagian penting. Kita mengambil 'id_user' dari token
    // dan menyimpannya di 'req.userId' untuk digunakan di rute selanjutnya.
    req.userId = decoded.id_user;

    // Tambahkan "mata-mata" di sini untuk debugging
    console.log('Middleware berhasil, userId:', req.userId);

    next(); // Lanjutkan ke fungsi rute (misalnya, update profile)
  } catch (err) {
    console.error('Token tidak valid:', err.message);
    return res.status(403).json({ message: 'Token tidak valid.' });
  }
};

module.exports = authMiddleware;
