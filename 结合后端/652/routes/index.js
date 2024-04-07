const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const User= require('../Models/user'); 
const Fav= require('../Models/favorite');
const session = require('express-session');
const router =express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('./static/index.html');
});


router.use(bodyParser.json());
// 注册路由
router.post('/register', async (req, res) => {
  try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = await User.create({
        UserName: req.body.user,
        Email: req.body.email,
        Password: hashedPassword
      });
      // 注册成功后自动登录
      req.session.user = { id: newUser.id, name: newUser.UserName, email: newUser.Email };
      res.json({ success: true, user: { name: newUser.UserName } }); // 注意这里的name属性需要与你的User模型对应
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: '注册失败', error: error.message });
  }
});

// 登录路由
router.post('/login', async (req, res) => {
  try {
      const user = await User.findOne({ where: { UserName: req.body.name } });
      if (!user) {
          return res.json({ success: false, message: '用户不存在' });
      }
      const passwordValid = await bcrypt.compare(req.body.password, user.Password);
      if (passwordValid) {
          // 登录成功, 创建用户会话
          req.session.user = { id: user.id, name: user.UserName, email: user.Email };
          res.json({ success: true, user: { name: user.UserName } });
      } else {
          res.json({ success: false, message: '密码错误' });
      }
  } catch (error) {
     console.log(error);
      res.json({ success: false, message: '登录过程中出现错误' });
  }
});


router.get('/get-user-info', (req, res) => {
  if (req.session.user) {
      res.json({ isLoggedIn: true, user: req.session.user });
  } else {
      res.json({ isLoggedIn: false });
  }
});
// Express.js后端示例
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
      res.redirect('/'); // 或者返回一个状态，告诉客户端会话已结束
  });
});


router.get('/check-login', (req, res) => {
  if (req.session.user) { // 检查的是 req.session.user 而不是 req.session.isLoggedIn
      res.json({ isLoggedIn: true });
  } else {
      res.json({ isLoggedIn: false });
  }
});

function getUserInfo(req) {
  return req.session.user ? req.session.user.name : null;
}

async function getUserIdByUsername(username) {
  const user = await User.findOne({ where: { UserName: username } });
  return user ? user.id : null;
}
async function addFavorite(userId, perfumeId) {
  // 检查是否已经收藏
  const existingFavorite = await Fav.findOne({
    where: { userid: userId, perfumeid: perfumeId }
  });

  if (existingFavorite) {
    // 如果已经收藏，返回存在的记录
    return existingFavorite;
  } else {
    // 如果没有收藏，创建新的收藏记录
    return await Fav.create({ userid: userId, perfumeid: perfumeId });
  }
}

async function removeFavorite(userId, perfumeId) {
  // 删除收藏记录
  return await Fav.destroy({
    where: { userid: userId, perfumeid: perfumeId }
  });
}

router.post('/add-favorite', async (req, res) => {
  const username = await getUserInfo(req); // 获取当前登录的用户名
  const userId = await getUserIdByUsername(username); // 根据用户名获取用户ID
  const perfumeId = req.body.perfumeId; // 获取香水ID
  // 添加收藏到数据库
  await addFavorite(userId, perfumeId);
  res.sendStatus(200); // 发送成功响应
});

router.post('/remove-favorite', async (req, res) => {
  const username = await getUserInfo(req); // 获取当前登录的用户名
  const userId = await getUserIdByUsername(username); // 根据用户名获取用户ID
  const perfumeId = req.body.perfumeId; // 获取香水ID
  // 从数据库中移除收藏
  await removeFavorite(userId, perfumeId);
  res.sendStatus(200); // 发送成功响应
});

router.get('/get-user-favorites', async (req, res) => {
  if (!req.session.user) {
      // 如果用户未登录，返回空数组
      return res.json([]);
  }

  try {
      // 查询当前登录用户的所有收藏
      const favorites = await Fav.findAll({
          where: { userid: req.session.user.id }
      });

      // 提取香水ID并返回
      const perfumeIds = favorites.map(favorite => favorite.perfumeid);
      res.json(perfumeIds);
  } catch (error) {
      console.log(error);
      res.status(500).json({ message: '获取收藏列表失败' });
  }
});


router.post('/update-user-info', async function(req, res) {
  if (req.session.user) {
      try {
          const { UserName, Email, Gender, jianjie } = req.body;
          const userId = req.session.user.id;
          await User.update(
              { UserName, Email, Gender, jianjie },
              { where: { id: userId } }
          );
          res.json({ success: true, message: '信息更新成功' });
      } catch (error) {
          console.error(error);
          res.status(500).json({ success: false, message: '服务器错误', error: error.message });
      }
  } else {
      res.status(403).json({ success: false, message: '未登录' });
  }
});





module.exports = router;
