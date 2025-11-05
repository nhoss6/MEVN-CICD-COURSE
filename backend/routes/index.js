const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.json({
    message: '🛒 E-Commerce API',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      products: '/api/products',
      users: '/api/users',
      health: '/api/health'
    }
  });
});

module.exports = router;
