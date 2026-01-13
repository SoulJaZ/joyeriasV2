const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log('AUTH HEADER:', req.headers.authorization);


  if (!authHeader) {
    return res.status(401).json({ message: 'Token requerido' });
  }

  const [type, token] = authHeader.split(' ');

  if (type !== 'Bearer' || !token) {
    return res.status(401).json({ message: 'Formato de token inválido' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('JWT ERROR:', error.message);
    return res.status(401).json({ message: 'Token inválido' });
  }
};
