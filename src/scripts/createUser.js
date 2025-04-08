const path = require('path');
const envPath = path.resolve(process.cwd(), 'src', '.env');
require('dotenv').config({ path: envPath });

const sequelize = require('../config/bancodedados');
const User = require('../models/user');

async function createAdminUser() {
    const username = process.env.ADMIN_USERNAME;
    const password = process.env.ADMIN_PASSWORD;

    if (!username || !password) {
        console.error('ADMIN_USERNAME e ADMIN_PASSWORD devem ser definidos no arquivo .env e carregados corretamente.');
        console.error(`Valores lidos: USERNAME=${username}, PASSWORD=${password ? '******' : password}`);
        process.exit(1);
    }

    try {
        await sequelize.sync();
        console.log('Conexão com banco de dados estabelecida e modelos sincronizados.');

        const existingUser = await User.findOne({ where: { username } });

        if (existingUser) {
            console.log(`Usuário "${username}" já existe.`);
        } else {
            await User.create({ username, password });
            console.log(`Usuário "${username}" criado com sucesso.`);
        }
    } catch (error) {
        console.error('Erro ao criar usuário administrador:', error);
    } finally {
        await sequelize.close();
        console.log('Conexão com banco de dados fechada.');
    }
}

createAdminUser();