const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const {Op} = require('sequelize');
const User= require('../Models/user'); 
const Fav= require('../Models/favorite');
const perModel= require('../Models/perfumeMod');
const authenticate = require('./authenticate');
const { generateToken } = require('./jwtUtils');
const router =express.Router();
Fav.belongsTo(perModel, { foreignKey: 'perfumeid', as: 'Perfume' });
perModel.hasMany(Fav, { foreignKey: 'perfumeid', as: 'Favorites' });

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('./static/index.html');
});


router.use(bodyParser.json());
// 登录路由

router.post('/login', async (req, res) => {
  try {
      const user = await User.findOne({ where: { UserName: req.body.name } });
      if (!user) {
          return res.json({ success: false, message: '用户不存在' });
      }
      // 使用 bcryptjs 来比较密码
      const passwordValid = await bcrypt.compare(req.body.password, user.Password);
      if (passwordValid) {
          const token = generateToken(user);
          res.cookie('jwt', token, { httpOnly: false, secure: false }); // 设置JWT到Cookie
          res.json({ success: true, token, user: { name: user.UserName } });
      } else {
          res.json({ success: false, message: '密码错误' });
      }
  } catch (error) {
      console.log(error);
      res.json({ success: false, message: '登录过程中出现错误' });
  }
});

// 注册路由
router.post('/register', async (req, res) => {
  try {
      // 使用 bcryptjs 生成哈希密码
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = await User.create({
          UserName: req.body.user,
          Email: req.body.email,
          Password: hashedPassword
      });
      const token = generateToken(newUser);
      res.cookie('jwt', token, { httpOnly: false, secure: false }); // 设置JWT到Cookie
      res.json({ success: true, token, user: { name: newUser.UserName } });
  } catch (error) {
      console.log(error);
      res.json({ success: false, message: '注册失败', error: error.message });
  }
});


router.get('/get-user-info',authenticate, (req, res) => {
  res.json({ isLoggedIn: true, user: req.user });
});
// Express.js后端示例
router.get('/logout', (req, res) => {
  res.clearCookie('jwt'); // 清除JWT Cookie
  res.status(200).send({ success: true, message: '登出成功' });
});


router.get('/get-favorite-perfumes', authenticate, async (req, res) => {
  try {
      // 获取用户收藏的香水信息，并包括关联的香水信息
      const favorites = await Fav.findAll({
          where: { userid: req.user.id },
          include: [{
              model: perModel,
              as: 'Perfume'
          }]
      });

      // 提取收藏香水的所有标签并分割成数组
      const tags = favorites.reduce((acc, fav) => {
          const splitTags = fav.Perfume.biaoqian.split(' ');
          return acc.concat(splitTags);
      }, []);

      // 去除重复的标签
      const uniqueTags = [...new Set(tags)];

      // 构造查询条件，匹配任一标签
      const conditions = uniqueTags.map(tag => ({
          biaoqian: {
              [Op.like]: `%${tag}%`
          }
      }));

      // 根据标签搜索其他香水
      const perfumes = await perModel.findAll({
        attributes: ['id', '香水名', '标签'],  // 确保字段名称与数据库中的列名称一致
        where: {
            [Op.or]: conditions
        },
        limit: 24  
    });
    // 返回香水信息
    res.json(perfumes);
    
  } catch (error) {
      console.error('Error fetching perfumes based on favorite tags:', error);
      res.status(500).send('Internal Server Error');
  }
});





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

router.post('/add-favorite', authenticate, async (req, res) => {
  const userId = req.user.id; // JWT中已包含用户ID
  const perfumeId = req.body.perfumeId;
  await addFavorite(userId, perfumeId);
  res.sendStatus(200);
});

router.post('/remove-favorite', authenticate, async (req, res) => {
  const userId = req.user.id; // JWT中已包含用户ID
  const perfumeId = req.body.perfumeId;
  await removeFavorite(userId, perfumeId);
  res.sendStatus(200);
});

router.get('/get-user-favorites', authenticate, async (req, res) => {
  try {
    const favorites = await Fav.findAll({ where: { userid: req.user.id } });
    const perfumeIds = favorites.map(favorite => favorite.perfumeid);
    res.json(perfumeIds);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: '获取收藏列表失败' });
  }
});

router.post('/update-user-info', authenticate, async function(req, res) {
  try {
    const { UserName, Email, Gender, jianjie } = req.body;
    const userId = req.user.id; // JWT中已包含用户ID
    await User.update({ UserName, Email, Gender, jianjie }, { where: { id: userId } });
    res.json({ success: true, message: '信息更新成功' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: '服务器错误', error: error.message });
  }
});



module.exports = router;
