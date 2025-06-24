require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5001;
const NASA_API_KEY = process.env.NASA_API_KEY;

app.use(cors());

app.get('/api/apod', async (req, res) => {
  try {
    const nasaRes = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`);
    res.json(nasaRes.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from NASA API' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});