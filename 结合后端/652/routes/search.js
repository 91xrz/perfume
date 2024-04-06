const { Op } = require('sequelize');
const Brand =require('../Models/brands');
const Perfume =require('../Models/perfumeMod');
const Perfumer =require('../Models/perfumerMod');
var express = require('express');
var router = express.Router();

router.get('/', async (req, res) => {
    const searchQuery = req.query.query || ''; // 获取查询字符串或默认为空字符串

    // 初始化结果为空数组
    let brands = [];
    let perfumes = [];
    let perfumers = [];

    try {
        // 当查询字符串不为空时，执行数据库查询
        if (searchQuery !== '') {
            [brands, perfumes, perfumers] = await Promise.all([
                Brand.findAll({
                    where: { BrandName: { [Op.like]: `%${searchQuery}%` } }
                }),
                Perfume.findAll({
                    where: { perfumeName: { [Op.like]: `%${searchQuery}%` } }
                }),
                Perfumer.findAll({
                    where: { perfumer1: { [Op.like]: `%${searchQuery}%` } }
                })
            ]);
        }
        // 将结果传递给EJS模板
        res.render('search', { 
            query: searchQuery, 
            brands: brands, 
            perfumes: perfumes, 
            perfumers: perfumers 
        });
    } catch (error) {
        console.error('搜索错误:', error);
        res.status(500).send('搜索过程中发生错误。');
    }
});

// 示例：加载更多香水的路由
router.get('/loadMorePerfumes', async (req, res) => {
    const searchQuery = req.query.searchQuery;
    const offset = parseInt(req.query.offset) || 0;
    const limit = 5;
console.log(searchQuery);
console.log(offset);
console.log(limit);
    try {
        // Optional: Check total count before applying offset
        const totalCount = await Perfume.count({
            where: { perfumeName: { [Op.like]: `%${searchQuery}%` } },
        });
   console.log(totalCount);
        if (offset >= totalCount) {
            return res.json([]); // Return empty if offset exceeds total count
        }

        const perfumes = await Perfume.findAll({
            where: { perfumeName: { [Op.like]: `%${searchQuery}%` } },
            offset: offset,
            limit: limit
        });
  console.log(perfumes);
        res.json(perfumes);
    } catch (error) {
        console.error('加载更多香水时出错:', error);
        res.status(500).send('加载过程中发生错误。');
    }
});

module.exports = router;