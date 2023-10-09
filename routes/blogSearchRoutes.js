const express = require('express');
const router = express.Router();
const blogSearchController = require('../controllers/blogSearchController');
const fetchBlogDataMiddleware = require('../middleware/blogDataMiddleware');

// Middleware for data retrieval
router.use(fetchBlogDataMiddleware);

// Blog search endpoint
router.get('/', blogSearchController.searchBlogs);

module.exports = router;
