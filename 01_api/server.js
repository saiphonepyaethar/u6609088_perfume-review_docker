require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// Health check for Jenkins
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// GET all perfume reviews
app.get('/reviews', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM perfume_reviews ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'DB error', details: err });
  }
});

// POST new review
app.post('/reviews', async (req, res) => {
  const { name, brand, rating, review } = req.body;

  try {
    await pool.query(
      'INSERT INTO perfume_reviews (name, brand, rating, review) VALUES (?, ?, ?, ?)',
      [name, brand, rating, review]
    );
    res.json({ message: 'Review added successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Insert failed', details: err });
  }
});

// Start server
const PORT = process.env.API_PORT || 5000;
app.listen(PORT, () => console.log(`API running on port ${PORT}`));
