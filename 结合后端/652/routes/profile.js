
var express = require('express');
var router = express.Router();
const favModel = require('../Models/favorite'); // 请确保路径和文件名正确
const userModel = require('../Models/user'); // 请确保路径和文件名正确
const Per = require('../Models/perfumeMod'); 
const authenticate = require('./authenticate');

// 使用 authenticate 中间件来确保只有验证过的用户才能访问这个路由
router.get('/', authenticate,async function(req, res, next) {
    try {
        const userId = req.user.id;  // 从经过认证的JWT中获取用户ID
        const user = await userModel.findOne({ where: { id: userId } });

        if (!user) {
            return res.status(404).send('用户未找到');
        }

        // 查询当前用户的所有收藏
        const favorites = await favModel.findAll({ where: { userid: userId } });

        // 获取所有收藏的香水id
        const perfumeIds = favorites.map(fav => fav.perfumeid);

        // 如果没有收藏，则perfumeIds数组为空，这可能会导致查询失败，所以应进行检查
        const perfumes = perfumeIds.length > 0 ? await Per.findAll({ where: { id: perfumeIds } }) : [];

        // 渲染页面，传递用户信息和收藏的香水信息
        res.render('profile', { user: user, perfumes: perfumes });
    } catch (error) {
        console.error(error);
        res.status(500).send('服务器错误');
    }
});





module.exports = router;