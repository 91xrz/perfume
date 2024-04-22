// middleware/authenticate.js
const { verifyToken } = require('./jwtUtils');

function authenticate(req, res, next) {
  try {
    // 尝试从Authorization头部获取token
    let token;
    if (req.headers.authorization) {
      token = req.headers.authorization.split(' ')[1];
    }
    // 如果Authorization头部没有token，尝试从Cookie中获取
    else if (req.cookies.jwtToken) {
      token = req.cookies.jwtToken;
    }

    if (!token) {
      throw new Error('未提供令牌');
    }

    const decoded = verifyToken(token);
    req.user = decoded; // 将解码的用户信息添加到请求对象中
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: '无效的令牌' });
  }
}

module.exports = authenticate;
