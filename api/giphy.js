export default async function handler(req, res) {
  const { path } = req.query;
  const apiKey = process.env.VITE_GIPHY_API_KEY;
  
  try {
    const response = await fetch(
      `https://api.giphy.com/v1/${path}?api_key=${apiKey}${req.url.split('?')[1] || ''}`
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching from Giphy API' });
  }
} 