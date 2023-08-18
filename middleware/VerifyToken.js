const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  try {
    const bearToken = req.headers['authorization'];
    const token = bearToken.split(' ')[1];

    if (!token) {
      return res
        .status(400)
        .json({ message: 'アクセストークンはありません。' });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err,decoded) => {
      if (err) {
        return res.status(401).json({ message: '有効でないトークンです。' });
      } else {
        req.email = decoded.email
        next();
      }
    });
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};

module.exports = verifyToken;