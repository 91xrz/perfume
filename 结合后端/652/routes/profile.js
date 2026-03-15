const express = require('express');
const { Op } = require('sequelize');
const favModel = require('../Models/favorite');
const userModel = require('../Models/user');
const Per = require('../Models/perfumeMod');
const authenticate = require('./authenticate');

const router = express.Router();

router.get('/', authenticate, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await userModel.findOne({ where: { id: userId } });

        if (!user) {
            return res.status(404).send('用户未找到');
        }

        const favorites = await favModel.findAll({ where: { userid: userId } });
        const perfumeIds = favorites.map((fav) => fav.perfumeid);

        const perfumes = perfumeIds.length > 0
            ? await Per.findAll({ where: { id: { [Op.in]: perfumeIds } } })
            : [];

        return res.render('profile', { user, perfumes });
    } catch (error) {
        console.error(error);
        return res.status(500).send('服务器错误');
    }
});

module.exports = router;
