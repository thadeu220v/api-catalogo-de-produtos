const sequelize = require('./bancodedados');
const Product = require('./product');
const Category = require('./category');

Product.belongsToMany(Category, { through: 'ProductCategories' });
Category.belongsToMany(Product, { through: 'ProductCategories' });

sequelize.sync({ force: true })
.then(() => {
    console.log('Banco de dados e tabelas criadas com sucesso!');
});

module.exports = {
Product,
Category
};