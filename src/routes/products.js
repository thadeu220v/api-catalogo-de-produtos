const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

router.get('/products', productsController.getAllProducts);
router.post('/products', productsController.createProduct);
router.get('/products/:id', productsController.getProductById);
router.put('/products/:id', productsController.updateProduct);
router.patch('/products/:id', productsController.partialUpdateProduct);
router.delete('/products/:id', productsController.deleteProduct);

module.exports = router;