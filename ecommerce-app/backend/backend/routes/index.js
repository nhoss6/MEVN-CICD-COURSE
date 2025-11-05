var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ 
    message: 'Bienvenue sur l\'API E-Commerce',
    version: '1.0.0',
    endpoints: {
      products: '/api/products',
      users: '/users',
    }
  });
});

module.exports = router;