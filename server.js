const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 4000 

app.use(cors());

app.get('/api/videos', async (req, res) => {
  const category = req.query.category || 'blonde';
  try {
    const response = await axios.get(`https://www.eporner.com/api/v2/video/search/?query=${category}&per_page=10&order=top-weekly&thumbsize=big&format=json&gay=0`);
    res.json(response.data.videos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch from Eporner' });
  }
});
