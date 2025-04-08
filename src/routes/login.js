const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/user');

const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
    throw new Error('JWT_SECRET não está definido no .env');
}

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Usuário e senha são obrigatórios', code: 400 });
    }

    try {
        const user = await User.findOne({ where: { username } });

        if (!user) {
            return res.status(401).json({ error: 'Credenciais inválidas', code: 401 });
        }

        const isPasswordValid = user.isValidPassword(password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Credenciais inválidas', code: 401 });
        }

        const token = jwt.sign({ id: user.id, username: user.username }, jwtSecret, { expiresIn: '1h' });
        return res.json({ token });

    } catch (error) {
        console.error("Erro no login:", error);
        return res.status(500).json({ error: 'Erro interno do servidor', code: 500 });
    }
});

module.exports = router;