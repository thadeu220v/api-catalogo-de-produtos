const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/bancodedados');
require('./models/user');
const productsRoutes = require('./routes/products');
const categoriesRoutes = require('./routes/categories');
const autenticacaoRota = require('./routes/login');
const auth = require('./middleware/auth');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(autenticacaoRota);

app.use('/products', auth, productsRoutes);
app.use('/categories', auth, categoriesRoutes);

sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log('O servidor está funcionando na porta 3000');
    });
}).catch(err => {
    console.error('Há um problema com o sistema de banco de dados.', err);
});