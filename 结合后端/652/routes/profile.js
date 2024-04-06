
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
            res.render('profile', { user: user });
        } catch (error) {
            console.error(error);
            res.status(500).send('服务器错误');
        }
    } else {
        res.redirect('/login');
    }
});





module.exports = router;