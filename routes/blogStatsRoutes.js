const express = require('express');
const router = express.Router();
const blogStatsController = require('../controllers/blogStatsController');
const fetchBlogDataMiddleware = require('../middleware/blogDataMiddleware');

// Middleware for data retrieval
router.use(fetchBlogDataMiddleware);

// Blog stats endpoint
router.get('/', blogStatsController.getBlogStats);

module.exports = router;
