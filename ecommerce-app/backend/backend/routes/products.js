var express = require('express');
var router = express.Router();
const productController = require('../controllers/productController');

// Routes CRUD
router.get('/', productController.getAllProducts);
router.post('/', productController.createProduct);
router.get('/search', productController.searchProducts);
router.get('/category/:category', productController.getProductsByCategory);
router.get('/:id', productController.getProductById);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;