const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoriesController');
const autenticacaoMiddleware = require('../middleware/auth');

router.get('/', autenticacaoMiddleware, categoriesController.getAllCategories);
router.post('/', autenticacaoMiddleware, categoriesController.createCategory);
router.get('/:id', autenticacaoMiddleware, categoriesController.getCategoryById);
router.put('/:id', autenticacaoMiddleware, categoriesController.updateCategory);
router.delete('/:id', autenticacaoMiddleware, categoriesController.deleteCategory);

module.exports = router;