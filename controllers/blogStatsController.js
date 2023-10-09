const _ = require('lodash');

// Function to fetch and calculate blog stats
const calculateBlogStats = (blogData) => {
  const totalBlogs = blogData.blogs.length;
  const longestTitleBlog = _.maxBy(blogData.blogs, (blog) => (blog.title || '').length);
  const blogsWithPrivacy = _.filter(blogData.blogs, (blog) => {
    return blog.title && blog.title.toLowerCase().includes('privacy');
  });
  const uniqueBlogTitles = _.uniqBy(blogData.blogs, (blog) => (blog.title || ''));

  return {
    totalBlogs,
    longestTitle: longestTitleBlog ? longestTitleBlog.title : '',
    blogsWithPrivacy: blogsWithPrivacy.length,
    uniqueBlogTitles: uniqueBlogTitles.map((blog) => blog.title || ''),
  };
};

// Memoize the calculateBlogStats function with a caching duration
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes in milliseconds
const memoizedCalculateBlogStats = _.memoize(calculateBlogStats, undefined, CACHE_DURATION);

const getBlogStats = (req, res) => {
  const blogData = req.blogData;
  if (!blogData) {
    return res.status(500).json({ error: 'Blog data is not available' });
  }

  // Use the memoized function to get cached or calculate blog stats
  const blogStats = memoizedCalculateBlogStats(blogData);

  res.json(blogStats);
};

module.exports = {
  getBlogStats,
};
