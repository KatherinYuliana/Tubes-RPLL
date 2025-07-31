const express = require('express');
const router = express.Router();
const pool = require('../db');

// POST products
// router.post('/', async (req, res) => {
//   const { id_category, name_product, description, price, image_url} = req.body;
//   await pool.query('INSERT INTO products (id_category, name_product, description, price, image_url) VALUES ($1, $2, $3, $4, $5)', 
//     [id_category, name_product, description, price, image_url]);
//   res.json({ message: 'Product added' });
// });

// GET products
router.get('/detail', async (req, res) => {
  const products = await pool.query('SELECT * FROM products WHERE id_product = $1', [req.query.id_product]);
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


// DELETE product
// router.delete('/:id', async (req, res) => {
//   const { id } = req.params;
//   await pool.query('DELETE FROM products WHERE id = $1', [id]);
//   res.json({ message: 'Product deleted' });
// });

module.exports = router;