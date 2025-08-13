// routes/storeDescription.js
const express = require('express')
const router = express.Router()
const db = require('../db')

// Get store description
router.get('/about_us', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM store_description LIMIT 1')
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Update store description
router.put('/about_us/:id', async (req, res) => {
  const { id } = req.params
  const { description, address, phone_number, opening_hours, maps_url } = req.body

  try {
    const result = await db.query(
      `UPDATE store_description 
      SET 
      description = $1, 
      address = $2, 
      phone_number = $3, 
      opening_hours = $4, 
      maps_url = $5 
      WHERE id_store = $6 
      RETURNING *`,
      [description, address, phone_number, opening_hours, maps_url, id]
      // 'UPDATE store_description SET information = $1, description = $2, maps_url = $3 WHERE id_store = $4 RETURNING *',
      // [title, description, maps_url, id]
    )
    res.json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router