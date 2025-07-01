const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/api/videos', async (req, res) => {
  try {
    const response = await axios.get('https://www.eporner.com/api/v2/video/search/?query=blonde&per_page=5&order=top-weekly&thumbsize=big&format=json&gay=0');
    res.json(response.data.videos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch from Eporner' });
  }
});

app.listen(3000, () => console.log('Proxy running on http://localhost:3000'));