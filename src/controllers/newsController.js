const axios = require("axios");
const NEWS_API_KEY = process.env.NEWS_API_KEY;

const fetchNews = async (req, res) => {
  const userPreferences = req.user.preferences;

  try {
    const requests = userPreferences.map((preference) => {
      return axios.get(
        `https://newsapi.org/v2/everything?q=${preference}&apiKey=${NEWS_API_KEY}`
      );
    });

    const responses = await Promise.all(requests);

    const results = responses.flatMap((response) => response.data.articles);

    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while fetching news." });
  }
};

module.exports = { fetchNews };
