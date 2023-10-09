const axios = require('axios');

let cachedBlogData = null; // Global variable to cache the blog data
let cacheTimestamp = null; // Timestamp when the cache was last updated
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes in milliseconds

const fetchBlogData = async (req, res, next) => {
  try {
    // Check if the blog data is already cached and not expired
    if (cachedBlogData && cacheTimestamp && Date.now() - cacheTimestamp <= CACHE_DURATION) {
      req.blogData = cachedBlogData;
    } else {
      const response = await axios.get('https://intent-kit-16.hasura.app/api/rest/blogs', {
        headers: {
          'x-hasura-admin-secret': '32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6',
        },
      });

      if (!response.data) {
        throw new Error('Empty response from the API');
      }

      // Cache the fetched blog data and update the timestamp
      cachedBlogData = response.data;
      cacheTimestamp = Date.now();
      req.blogData = cachedBlogData;
    }

    next();
  } catch (error) {
    console.error('Error fetching or caching blog data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = fetchBlogData;
