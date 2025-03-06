const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/bancodedados');
const productsRoutes = require('./routes/products');
const categoriesRoutes = require('./routes/categories');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(productsRoutes);
app.use(categoriesRoutes);

sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log('O servidor está funcionando na porta 3000');
    });
}).catch(err => {
    console.error('Há um problema com o sistema de banco de dados.', err);
});