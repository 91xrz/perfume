const jwt = require('jsonwebtoken');

const secretKey = 'your_secret_key'; // 保持安全，可以考虑从环境变量中读取

function generateToken(user) {
  return jwt.sign({ id: user.id, name: user.UserName, email: user.Email }, secretKey, { expiresIn: '24h' });
}

function verifyToken(token) {
  return jwt.verify(token, secretKey);
}

module.exports = { generateToken, verifyToken };