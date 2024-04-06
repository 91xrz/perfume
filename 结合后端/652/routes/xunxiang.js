const express = require('express');
const router = express.Router();
const per=require('../Models/perfumeMod');
var { Op } = require("sequelize");


const paramToFieldMapping = {
    "属性：": "shuxing",
    "性格：": "xingge",
    "场景：": "changjing",
    "气味：": "qiwei",
    "香调：": "xiangdiao"
};

router.get('/', async (req, res) => {
    let { offset = 0, limit = 10 } = req.query; // 接收offset和limit参数
    offset = parseInt(offset, 10);
    limit = parseInt(limit, 10);

    let queryConditions = {};
    for (let param in req.query) {
        if (req.query.hasOwnProperty(param) && param !== 'offset' && param !== 'limit' && req.query[param]) {
            // 假设 paramToFieldMapping 是已定义的映射，将请求参数映射到数据库字段
            let fieldName = paramToFieldMapping[param];
            if (fieldName && req.query[param].trim() !== '全部') {
                queryConditions[fieldName] = { [Op.like]: `%${req.query[param].trim()}%` };
            }
        }
    }

    try {
        // 首先获取总记录数
        const totalItems = await per.count({
            where: queryConditions,
        });

        // 根据查询条件获取当前页的产品列表
        const products = await per.findAll({
            where: queryConditions,
            offset: offset,
            limit: limit,
        });

        // 计算总页数
        const totalPages = Math.ceil(totalItems / limit);

        // 构建并发送响应
        res.json({
            items: products, // 当前页的数据
            totalItems: totalItems, // 总记录数
            totalPages: totalPages, // 总页数
            currentPage: offset / limit + 1, // 当前页码
        });
    } catch (error) {
        console.error('Failed to fetch products:', error);
        res.status(500).send({ error: 'Failed to fetch products' });
    }
  });

module.exports = router;
