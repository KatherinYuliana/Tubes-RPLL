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
  const { id_category, name_product, description, price, image_url } = req.body;
  await pool.query('INSERT INTO products (id_category, name_product, description, price, image_url) VALUES ($1, $2, $3, $4, $5)',
    [id_category, name_product, description, price, image_url]);
  res.json({ message: 'Product added' });
});

// GET products (menampilkan detail produk)
// router.get('/detail', async (req, res) => {
//   try {
//     const { id_product } = req.query

//     if (!id_product) {
//       return res.status(400).json({
//         error: 'id_product parameter is required'
//       })
//     }

//     const result = await pool.query(
//       `SELECT p.*, c.name_category
// FROM products p
// LEFT JOIN categories c
// ON p.id_category = c.id_category WHERE p.id_product = 1`,
//       [id_product]
//     )

//     if (result.rows.length === 0) {
//       return res.status(404).json({
//         error: 'Product not found'
//       })
//     }

//     res.json(result.rows)
//   } catch (err) {
//     console.error(err)
//     res.status(500).json({
//       error: 'Server error'
//     })
//   }
// })
// In your products.js backend route
router.get('/detail', async (req, res) => {
  const { id_product } = req.query;

  if (!id_product) {
    return res.status(400).json({ error: 'Product ID is required' });
  }

  try {
    console.log('Fetching product with ID:', id_product);

    const query = `
      SELECT p.*, c.name_category
      FROM products p
      LEFT JOIN categories c ON p.id_category = c.id_category
      WHERE p.id_product = $1
    `;

    const result = await pool.query(query, [id_product]);

    console.log('Query result:', result.rows);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(result.rows);
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({
      error: 'Internal server error',
      details: err.message // Include error details
    });
  }
});

// GET products random
router.get('/random', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id_product, name_product, image_url FROM products ORDER BY RANDOM() LIMIT 10' // 5 random items
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

// Search endpoint
router.post('/search', async (req, res) => {
  try {
    const { query, type } = req.body;

    let sql;
    let params;

    if (type === 'name') {
      sql = `
        SELECT
          p.id_product,
          p.name_product,
          p.image_url
        FROM
          products p
        WHERE
          p.name_product ILIKE '%' || $1 || '%';
      `;
      params = [`%${query}%`];
    } else if (type === 'category') {
      sql = `
        SELECT
          p.id_product,
          p.name_product,
          p.image_url
        FROM
          products p
        JOIN
          categories c ON p.id_category = c.id_category
        WHERE
          c.name_category ILIKE '%' || $1 || '%';
      `;
      params = [`%${query}%`];
    } else {
      return res.status(400).json({ error: 'Invalid search type' });
    }

    const result = await pool.query(sql, params);
    res.json(result.rows);

  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const fs = require('fs');
// const path = require('path');

router.delete('/:id_product', async (req, res) => {
  const { id_product } = req.params;

  if (!id_product) {
    return res.status(400).json({ error: 'Product ID is required' });
  }

  try {
    // 1. Dapatkan informasi produk termasuk nama file gambar
    const productResult = await pool.query(
      'SELECT image_url FROM products WHERE id_product = $1',
      [id_product]
    );

    if (productResult.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const imageUrl = productResult.rows[0].image_url;

    // 2. Hapus produk dari database
    await pool.query(
      'DELETE FROM products WHERE id_product = $1',
      [id_product]
    );

    // 3. Hapus file gambar jika ada
    if (imageUrl) {
      const imagePath = path.join(__dirname, '../../public/Foto Produk', imageUrl);

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
        console.log(`Deleted image file: ${imagePath}`);
      } else {
        console.log(`Image file not found: ${imagePath}`);
      }
    }

    res.json({
      message: 'Product and associated image deleted successfully'
    });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({
      error: 'Internal server error',
      details: err.message
    });
  }
});
// DELETE product
// router.delete('/:id', async (req, res) => {
//   const { id } = req.params;
//   await pool.query('DELETE FROM products WHERE id = $1', [id]);
//   res.json({ message: 'Product deleted' });
// });

module.exports = router;
