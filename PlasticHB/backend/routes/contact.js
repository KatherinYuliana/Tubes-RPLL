// routes/contactMessages.js
const express = require('express')
const router = express.Router()
const db = require('../db')

// Submit new message
router.post('/send', async (req, res) => {
  try {
    const { id_user, message, send_at } = req.body
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' })
    }

    // Gunakan timestamp dari client atau buat baru jika tidak ada
    const timestamp = send_at || new Date().toISOString()

    const result = await db.query(
      `INSERT INTO contact_messages 
       (id_user, message, send_at) 
       VALUES ($1, $2, $3) 
       RETURNING *`,
      [id_user || null, message, timestamp]
    )
    
    res.status(201).json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Get all contact messages with user data
router.get('/view_message', async (req, res) => {
  try {
    const query = `
      SELECT 
        cm.id_contact,
        u.username,
        cm.message,
        cm.send_at
      FROM contact_messages cm
      LEFT JOIN users u ON cm.id_user = u.id_user
      ORDER BY cm.send_at ASC
    `
    const result = await db.query(query)
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Delete message
router.delete('/:id_contact', async (req, res) => {
  try {
    const { id_contact } = req.params
    await db.query('DELETE FROM contact_messages WHERE id_contact = $1', [id_contact])
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router