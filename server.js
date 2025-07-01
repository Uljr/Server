const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const EPORNER_API_BASE = 'https://www.eporner.com/api/v2/video/search/';

app.use(cors());

app.get('/api/videos', async (req, res) => {
  const category = req.query.category || 'top'; // default to 'top'

  const apiURL = `${EPORNER_API_BASE}?query=${encodeURIComponent(category)}&per_page=10&order=top-weekly&thumbsize=big&format=json&gay=0`;

  try {
    const response = await axios.get(apiURL);

    if (!response.data || !response.data.videos) {
      return res.status(500).json({ error: 'Invalid API response from Eporner' });
    }

    res.json(response.data.videos);
  } catch (err) {
    console.error(`[ERROR] Failed to fetch from Eporner API:`, err.message);
    res.status(500).json({ error: 'Could not fetch videos from Eporner' });
  }
});

app.get('/', (req, res) => {
  res.send('✅ Eporner Proxy is running.');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
