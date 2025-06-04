export default async function handler(req, res) {
  const { path } = req.query;
  const apiKey = process.env.VITE_GIPHY_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  if (!path) {
    return res.status(400).json({ error: 'Path parameter is required' });
  }

  try {
    // Get query parameters from the original request
    const queryParams = new URLSearchParams(req.url.split('?')[1] || '');
    
    // Build the Giphy API URL
    const giphyUrl = new URL(`https://api.giphy.com/v1/${path}`);
    giphyUrl.searchParams.append('api_key', apiKey);
    
    // Add all other query parameters
    queryParams.forEach((value, key) => {
      if (key !== 'path') {
        giphyUrl.searchParams.append(key, value);
      }
    });

    const response = await fetch(giphyUrl.toString());
    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching from Giphy API:', error);
    res.status(500).json({ 
      error: 'Error fetching from Giphy API',
      details: error.message 
    });
  }
} 