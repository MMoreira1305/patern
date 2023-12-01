const jwt = require('jsonwebtoken');

// Middleware de verificação do token
function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({ message: 'Token não fornecido' });
  }

  jwt.verify(token.split(' ')[1], 'seuSegredoDoToken', (err, decoded) => {
    if (err) {
      console.error(err); // Adicione um log para verificar erros
      return res.status(401).json({ message: 'Token inválido' });
    }

    req.userId = decoded.id;
    next();
  });
}

module.exports = verifyToken;