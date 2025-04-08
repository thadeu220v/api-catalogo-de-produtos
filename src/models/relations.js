const sequelize = require('../config/bancodedados');
const Product = require('./product');
const Category = require('./category');
const User = require('./user');


Product.belongsToMany(Category, { through: 'ProductCategories' });
Category.belongsToMany(Product, { through: 'ProductCategories' });


sequelize.sync()
    .then(() => {
        console.log('Banco de dados e tabelas sincronizadas');
    })
    .catch(err => {
        console.error('Erro ao sincronizar o banco de dados:', err);
    });

module.exports = {
    Product,
    Category,
    User
};