const _ = require('lodash');

// Function to filter blogs based on the query
const filterBlogsByQuery = (blogData, query) => {
  return blogData.blogs.filter((blog) => {
    if (blog.title !== undefined && blog.title !== null) {
      if (typeof blog.title === 'string') {
        return blog.title.toLowerCase().includes(query);
      }
      return false;
    }
    return false;
  });
};

// Define a custom resolver function for memoization
const customResolver = (blogData, query) => {
  // Use a combination of blogData and query as the cache key
  return JSON.stringify({ blogData, query });
};

// Memoize the filterBlogsByQuery function with a custom resolver and caching duration
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes in milliseconds
const memoizedFilterBlogsByQuery = _.memoize(filterBlogsByQuery, customResolver, CACHE_DURATION);

const searchBlogs = (req, res) => {
  if (Object.keys(req.query).length === 0) {
    return res.status(500).json({ error: 'Query is not specified' });
  }
  const query = req.query.query.toLowerCase();

  if (!req.blogData) {
    return res.status(500).json({ error: 'Blog data is not available' });
  }

  // Use the memoized function with the query parameter to get cached or filter blog results
  const filteredBlogs = memoizedFilterBlogsByQuery(req.blogData, query);

  res.json(filteredBlogs);
};

module.exports = {
  searchBlogs,
};
