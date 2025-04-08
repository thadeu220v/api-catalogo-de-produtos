const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
    throw new Error('JWT_SECRET não está definido no .env');
}

module.exports = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ error: 'Acesso negado. Token não fornecido.', code: 401 });
    }

    try {
        const decodificado = jwt.verify(token, jwtSecret);
        req.user = decodificado;
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
             return res.status(401).json({ error: 'Token expirado.', code: 401 });
        }
        res.status(400).json({ error: 'Token inválido.', code: 400 });
    }
};