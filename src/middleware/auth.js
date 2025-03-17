const jwt = require('jsonwebtoken');
const chave = 'desenvolvimentoContinuo';

module.exports = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ error: 'Acesso negado. Token não fornecido.', code: 401 });
    }

    try {
        const decodificado = jwt.verify(token, chave);
        req.user = decodificado;
        next();
    } catch (err) {
        res.status(400).json({ error: 'Token inválido.', code: 400 });
    }
};
