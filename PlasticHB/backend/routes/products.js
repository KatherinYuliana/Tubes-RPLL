const express = require('express');
const multer = require('multer'); // npm install multer
const path = require('path');
const router = express.Router();
const pool = require('../db');

const uploadDir = path.join(__dirname, '../../public/Foto Produk'); // ganti sesuai folder kamu

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, file.originalname) // Simpan nama asli
});

const upload = multer({ storage });
// const router = express.Router();

router.post('/upload', upload.single('image_url'), (req, res) => {
  if (!req.file) return res.status(400).send('No file uploaded.');
  res.send({ filename: req.file.originalname });
});


// POST products
router.post('/add', async (req, res) => {
  const { id_category, name_product, description, price, image_url} = req.body;
  await pool.query('INSERT INTO products (id_category, name_product, description, price, image_url) VALUES ($1, $2, $3, $4, $5)', 
    [id_category, name_product, description, price, image_url]);
  res.json({ message: 'Product added' });
});

// GET products
router.get('/detail', async (req, res) => {
  const products = await pool.query(
    `SELECT c.name_category, p.name_product, p.description, p.price, p.image_url
    FROM products p 
    JOIN categories c 
    ON p.id_category = c.id_category 
    WHERE p.id_product = $1;`, [req.query.id_product]);
  // const products = await pool.query('SELECT * FROM products WHERE id_product = $1', [req.query.id_product]);
  res.json(products.rows);
});

// GET /api/products/random
router.get('/random', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id_product, name_product, image_url FROM products ORDER BY RANDOM() LIMIT 2' // 5 random items
    )
    res.json(result.rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
})

// GET categories
router.get('/categories', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM categories');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE product
// router.delete('/:id', async (req, res) => {
//   const { id } = req.params;
//   await pool.query('DELETE FROM products WHERE id = $1', [id]);
//   res.json({ message: 'Product deleted' });
// });

module.exports = router;