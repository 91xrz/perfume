
var express = require('express');
var router = express.Router();
const favModel = require('../Models/favorite'); // 请确保路径和文件名正确
const userModel = require('../Models/user'); // 请确保路径和文件名正确
const Per = require('../Models/perfumeMod'); 


router.get('/', async function(req, res, next) {
    if (req.session.user) {
        try {
            const userId = req.session.user.id;
            const user = await userModel.findOne({ where: { id: userId } });

            // 查询当前用户的所有收藏
            const favorites = await favModel.findAll({ where: { userid: userId } });

            // 获取所有收藏的香水id
            const perfumeIds = favorites.map(fav => fav.perfumeid);

            // 查询对应的香水信息
            const perfume = await Per.findAll({ where: { id: perfumeIds } });

            // 渲染页面，传递用户信息和收藏的香水信息
            res.render('profile', { user: user, perfumes: perfume });
        } catch (error) {
            console.error(error);
            res.status(500).send('服务器错误');
        }
    }
});





module.exports = router;