const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoriesController');

router.get('/categories', categoriesController.getAllCategories);
router.post('/categories', categoriesController.createCategory);
router.get('/categories/:id', categoriesController.getCategoryById);
router.put('/categories/:id', categoriesController.updateCategory);
router.delete('/categories/:id', categoriesController.deleteCategory);

module.exports = router;