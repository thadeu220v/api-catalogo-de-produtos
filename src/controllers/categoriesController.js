const Joi = require('joi');
const { Category, Product } = require('../models/relations');

const categorySchema = Joi.object({
    name: Joi.string().min(3).required()
}).unknown(false);

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.json(categories);
    } catch (err) {
        console.error('Erro ao buscar categorias:', err);
        res.status(500).json({ error: 'Erro ao buscar categorias', code: 500 });
    }
};

exports.createCategory = async (req, res) => {
    const { error, value } = categorySchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message, code: 400 });
    }

    try {
        const category = await Category.create(value);
        res.status(201).json(category);
    } catch (err) {
        console.error('Erro ao criar categoria:', err);
        res.status(500).json({ error: 'Erro ao criar categoria', code: 500 });
    }
};

exports.getCategoryById = async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id, { include: Product });
        if (!category) {
            return res.status(404).json({ error: 'A categoria solicitada não existe', code: 404 });
        }
        res.json(category);
    } catch (err) {
        console.error('Erro ao buscar categoria:', err);
        res.status(500).json({ error: 'Erro ao buscar categoria', code: 500 });
    }
};

exports.updateCategory = async (req, res) => {
    const { error, value } = categorySchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message, code: 400 });
    }

    try {
        const category = await Category.findByPk(req.params.id);
        if (!category) {
            return res.status(404).json({ error: 'Não encontramos esta categoria para atualização', code: 404 });
        }
        await category.update(value);
        res.status(200).json(category);
    } catch (err) {
        console.error('Erro ao atualizar categoria:', err);
        res.status(500).json({ error: 'Erro ao atualizar categoria', code: 500 });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (!category) {
            return res.status(404).json({ error: 'A categoria não pode ser deletada porque ela não existe', code: 404 });
        }
        await category.destroy();
        res.status(200).json({ message: 'Categoria deletada com sucesso', code: 200 });
    } catch (err) {
        console.error('Erro ao excluir categoria:', err);
        res.status(500).json({ error: 'Erro ao excluir categoria', code: 500 });
    }
};