const sequelize = require('sequelize');
const db = new sequelize({
    dialect: 'sqlite',
    Storage: 'banco.sqlite'
});

module.exports = db;