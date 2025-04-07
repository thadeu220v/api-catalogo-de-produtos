const Joi = require('joi');
const { Product, Category } = require('../models/relations');

const productSchema = Joi.object({
name: Joi.string().min(3).required(),
description: Joi.string().optional(),
price: Joi.number().required(),
stock: Joi.number().required(),
categories: Joi.array().items(Joi.number()).optional()
}).unknown(false);


const quantitySchema = Joi.object({
    quantity: Joi.number().integer().min(1).required()
}).unknown(false);

exports.getAllProducts = async (req, res) => {
try {
    let { page = 1, limit = 10, category } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    const queryOptions = {
        offset: (page - 1) * limit,
        limit: limit,
        include: Category
    };

    if (category) {
        queryOptions.include = {
            model: Category,
            where: { id: category }
        };
    }

    const products = await Product.findAll(queryOptions);
    res.json(products);
} catch (err) {
    console.error('Erro ao buscar produtos:', err);
    res.status(500).json({ error: 'Erro ao buscar produtos', code: 500 });
}
};

exports.createProduct = async (req, res) => {
const { error, value } = productSchema.validate(req.body);
if (error) {
    return res.status(400).json({ error: error.details[0].message, code: 400 });
}

try {
    const product = await Product.create(value);
    if (value.categories) {
        const categories = await Category.findAll({ where: { id: value.categories } });
        await product.setCategories(categories);
    }
    const productWithCategories = await Product.findByPk(product.id, { include: Category });
    res.status(201).json(productWithCategories);
} catch (err) {
    console.error('Erro ao criar produto:', err);
    res.status(500).json({ error: 'Erro ao criar produto', code: 500 });
}
};

exports.getProductById = async (req, res) => {
try {
    const product = await Product.findByPk(req.params.id, { include: Category });
    if (!product) {
        return res.status(404).json({ error: 'O produto solicitado não existe', code: 404 });
    }
    res.json(product);
} catch (err) {
    console.error('Erro ao buscar produto:', err);
    res.status(500).json({ error: 'Erro ao buscar produto', code: 500 });
}
};

exports.updateProduct = async (req, res) => {
const { error, value } = productSchema.validate(req.body);
if (error) {
    return res.status(400).json({ error: error.details[0].message, code: 400 });
}

try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
        return res.status(404).json({ error: 'Não encontramos este produto para atualização', code: 404 });
    }
    await product.update(value);
    if (value.categories) {
        const categories = await Category.findAll({ where: { id: value.categories } });
        await product.setCategories(categories);
    }
    const productWithCategories = await Product.findByPk(product.id, { include: Category });
    res.status(200).json(productWithCategories);
} catch (err) {
    console.error('Erro ao atualizar produto:', err);
    res.status(500).json({ error: 'Erro ao atualizar produto', code: 500 });
}
};

exports.partialUpdateProduct = async (req, res) => {
try {
const product = await Product.findByPk(req.params.id);
if (!product) {
return res.status(404).json({ error: 'Não encontramos este produto para atualização', code: 404 });
}

const updatedData = { ...product.toJSON(), ...req.body };
delete updatedData.id;
delete updatedData.createdAt;
delete updatedData.updatedAt;
const { error, value } = productSchema.validate(updatedData);
if (error) {
return res.status(400).json({ error: error.details[0].message, code: 400 });
}

await product.update(value);
if (value.categories) {
const categories = await Category.findAll({ where: { id: value.categories } });
await product.setCategories(categories);
}
const productWithCategories = await Product.findByPk(product.id, { include: Category });
res.status(200).json(productWithCategories);
} catch (err) {
console.error('Erro ao atualizar produto:', err);
res.status(500).json({ error: 'Erro ao atualizar produto', code: 500 });
}
};

exports.deleteProduct = async (req, res) => {
try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
        return res.status(404).json({ error: 'O produto não pode ser deletado porque ele não existe', code: 404 });
    }
    await product.destroy();
    res.status(200).json({ message: 'Produto deletado com sucesso', code: 200 });
} catch (err) {
    console.error('Erro ao excluir produto:', err);
    res.status(500).json({ error: 'Erro ao excluir produto', code: 500 });
}
};

exports.buyProductStock = async (req, res) => {
    const { error, value } = quantitySchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message, code: 400 });
    }
    const { quantity } = value;
    const { id } = req.params;
    try {
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ error: 'Não é possível comprar estoque deste produto, pois ele não existe.', code: 404 });
        }

        product.stock += quantity;
        await product.save();

        const productWithCategories = await Product.findByPk(product.id, { include: Category });
        res.status(200).json(product);
    } catch (err) {
        console.error('Erro ao adicionar estoque do produto:', err);
        res.status(500).json({ error: 'Erro interno ao comprar estoque do produto informado.', code: 500 
        });
    }
};

exports.sellProductStock = async (req, res) => {
    const { error, value } = quantitySchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message, code: 400 });
    }

    const { quantity } = value;
    const { id } = req.params;

    try {
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ error: 'Produto não encontrado para realizar a venda.', code: 404 });
        }

        if (product.stock <= 0) {
            return res.status(400).json({ error: 'Não é possível concluir a venda, pois o produto informado encontra-se sem estoque.', code: 400 });
        }
        if (product.stock < quantity) {
            return res.status(400).json({
                error: `Estoque insuficiente (${product.stock} unidades) para vender ${quantity} unidades.`,
                code: 400,
                currentStock: product.stock
            });
        }

        product.stock -= quantity;
        await product.save();

        
        const productWithCategories = await Product.findByPk(product.id, { include: Category });
        res.status(200).json(product); 

    } catch (err) {
        console.error('Houve um erro durante sua venda:', err);
        res.status(500).json({ error: 'Erro interno ao processar a venda do produto.', code: 500 });
    }          
};