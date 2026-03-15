const { Op } = require('sequelize');
const Brand = require('../Models/brands');
const Perfume = require('../Models/perfumeMod');
const Perfumer = require('../Models/perfumerMod');
const express = require('express');

const router = express.Router();
const DEFAULT_LIMIT = 5;

const buildLikeWhere = (field, keyword) => ({
    [field]: { [Op.like]: `%${keyword}%` },
});

const findByKeyword = (model, field, keyword, options = {}) => model.findAll({
    where: buildLikeWhere(field, keyword),
    ...options,
});

router.get('/', async (req, res) => {
    const searchQuery = (req.query.query || '').trim();

    if (!searchQuery) {
        return res.render('search', {
            query: '',
            brands: [],
            perfumes: [],
            perfumers: [],
        });
    }

    try {
        const [brands, perfumes, perfumers] = await Promise.all([
            findByKeyword(Brand, 'BrandName', searchQuery),
            findByKeyword(Perfume, 'perfumeName', searchQuery),
            findByKeyword(Perfumer, 'perfumer1', searchQuery),
        ]);

        return res.render('search', {
            query: searchQuery,
            brands,
            perfumes,
            perfumers,
        });
    } catch (error) {
        console.error('搜索错误:', error);
        return res.status(500).send('搜索过程中发生错误。');
    }
});

router.get('/loadMorePerfumes', async (req, res) => {
    const searchQuery = (req.query.searchQuery || '').trim();
    const offset = Number.parseInt(req.query.offset, 10) || 0;

    if (!searchQuery) {
        return res.json([]);
    }

    try {
        const where = buildLikeWhere('perfumeName', searchQuery);
        const totalCount = await Perfume.count({ where });

        if (offset >= totalCount) {
            return res.json([]);
        }

        const perfumes = await Perfume.findAll({
            where,
            offset,
            limit: DEFAULT_LIMIT,
        });

        return res.json(perfumes);
    } catch (error) {
        console.error('加载更多香水时出错:', error);
        return res.status(500).send('加载过程中发生错误。');
    }
});

module.exports = router;
