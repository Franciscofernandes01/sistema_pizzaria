const jwt = require('jsonwebtoken');

// Middleware para autenticação JWT
const autenticarJWT = (req, res, next) => {
  const token = req.headers.token?.split(" ")[1];
  if (!token) return res.status(403).send("Token não fornecido.");
  try {
    const dados = jwt.verify(token, "segredoJWT");
    req.user = dados;
    next();
  } catch {
    res.status(403).send("Token inválido.");
  }
};

module.exports = {autenticarJWT};