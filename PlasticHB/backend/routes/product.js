const express = require('express');
const router = express.Router();
const pool = require('../db');

// POST products
router.post('/', async (req, res) => {
  const { id_category, name_product, description, price, image_url} = req.body;
  await pool.query('INSERT INTO products (id_category, name_product, description, price, image_url) VALUES ($1, $2, $3, $4, $5)', 
    [id_category, name_product, description, price, image_url]);
  res.json({ message: 'Product added' });
});

// GET products
router.get('/', async (req, res) => {
  const products = await pool.query('SELECT * FROM products');
  res.json(products.rows);
});

// DELETE product
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM products WHERE id = $1', [id]);
  res.json({ message: 'Product deleted' });
});

module.exports = router;