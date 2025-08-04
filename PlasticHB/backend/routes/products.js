const express = require('express');
const multer = require('multer'); // npm install multer
const path = require('path');
const router = express.Router();
const pool = require('../db');

// upload gambar ke folder tertentu
const uploadDir = path.join(__dirname, '../../public/Foto Produk'); // ganti sesuai folder kamu
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, file.originalname) // Simpan nama asli
});

const upload = multer({ storage });

router.post('/upload', upload.single('image_url'), (req, res) => {
  if (!req.file) return res.status(400).send('No file uploaded.');
  res.send({ filename: req.file.originalname });
});

// POST products (tambah produk)
router.post('/add', async (req, res) => {
  const { id_category, name_product, description, price, image_url} = req.body;
  await pool.query('INSERT INTO products (id_category, name_product, description, price, image_url) VALUES ($1, $2, $3, $4, $5)', 
    [id_category, name_product, description, price, image_url]);
  res.json({ message: 'Product added' });
});

// GET products (menampilkan detail produk)
router.get('/detail', async (req, res) => {
  try {
    const { id_product } = req.query
    
    if (!id_product) {
      return res.status(400).json({ 
        error: 'id_product parameter is required' 
      })
    }
    
    const result = await pool.query(
      'SELECT * FROM products WHERE id_product = $1',
      [id_product]
    )
    
    if (result.rows.length === 0) {
      return res.status(404).json({ 
        error: 'Product not found' 
      })
    }
    
    res.json(result.rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ 
      error: 'Server error' 
    })
  }
})

// GET products random
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

// GET categories (menampilkan semua yang ada di tabel kategori)
router.get('/categories', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM categories');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// UPDATE product
router.put('/edit', async (req, res) => {
  const { id_product, id_category, name_product, description, price, image_url } = req.body;
  try {
    await pool.query(
      'UPDATE products SET id_category = $1, name_product = $2, description = $3, price = $4, image_url = $5 WHERE id_product = $6',
      [id_category, name_product, description, price, image_url, id_product]
    );
    res.json({ message: 'Product updated' });
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