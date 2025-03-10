const sequelize = require('../config/bancodedados');
const Product = require('./product');
const Category = require('./category');

// Definindo a relação muitos-para-muitos entre Produtos e Categorias
Product.belongsToMany(Category, { through: 'ProductCategories' });
Category.belongsToMany(Product, { through: 'ProductCategories' });


sequelize.sync({ force: true })  
    .then(() => {
        console.log('Banco de dados e tabelas criadas');
    })
    .catch(err => {
        console.error('Erro ao sincronizar o banco de dados:', err);
    });

module.exports = {
    Product,
    Category
};