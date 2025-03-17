const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const autenticacaoMiddleware = require('../middleware/auth');

router.get('/', autenticacaoMiddleware, productsController.getAllProducts);
router.post('/', autenticacaoMiddleware, productsController.createProduct);
router.get('/:id', autenticacaoMiddleware, productsController.getProductById);
router.put('/:id', autenticacaoMiddleware, productsController.updateProduct);
router.patch('/:id', autenticacaoMiddleware, productsController.partialUpdateProduct);
router.delete('/:id', autenticacaoMiddleware, productsController.deleteProduct);

module.exports = router;