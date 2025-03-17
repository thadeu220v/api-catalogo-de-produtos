const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const chave = 'desenvolvimentoContinuo';

router.post('/login', (req, res) => {
    const { username, password } = req.body;


    if (username === 'thadeu' && password === '5337283595103545') {
        const token = jwt.sign({ username }, chave, { expiresIn: '1h' });
        return res.json({ token });
    }

    res.status(401).json({ error: 'Credenciais inválidas', code: 401 });
});

module.exports = router;
