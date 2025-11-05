const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// GET all products
router.get('/', productController.getAllProducts);

// SEARCH products
router.get('/search', productController.searchProducts);

// CREATE product
router.post('/', productController.createProduct);

// GET product by ID
router.get('/:id', productController.getProductById);

// UPDATE product
router.put('/:id', productController.updateProduct);

// DELETE product
router.delete('/:id', productController.deleteProduct);

module.exports = router;
