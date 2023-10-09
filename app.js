const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const blogStatsRoutes = require('./routes/blogStatsRoutes');
const blogSearchRoutes = require('./routes/blogSearchRoutes');
const _ = require('lodash');

// Clear the memoization cache every CACHE_DURATION milliseconds
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes in milliseconds
setInterval(() => {
  _.memoize.Cache = new WeakMap();
}, CACHE_DURATION);

// Error handling middleware (optional)
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Use routes
app.use('/api/blog-stats', blogStatsRoutes);
app.use('/api/blog-search', blogSearchRoutes);

// Start the Express.js server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
