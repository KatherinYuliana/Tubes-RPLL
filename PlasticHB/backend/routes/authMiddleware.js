const jwt = require('jsonwebtoken');
const SECRET = 'rahasia123'; // Harus sama dengan yang di users.js

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token tidak ada atau format salah' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded; // Menambahkan user ke request object
    next();
  } catch (err) {
    console.error("JWT Error:", err);
    return res.status(403).json({ message: 'Token tidak valid' });
  }
};