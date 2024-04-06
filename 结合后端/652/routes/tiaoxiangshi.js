const { Op } = require('sequelize');
const per=require('../Models/perfumerMod');
const Per=require('../Models/perfumeMod');
var express = require('express');
var router = express.Router();

router.get('/',async (req, res) =>{
    try {
        const perfumer = await per.findAll(); // 从你的数据库获取所有调香师信息

        perfumer.sort((a, b) => {
            if(a.perfumer1 < b.perfumer1) return -1;
            if(a.perfumer1 > b.perfumer1) return 1;
            return 0;
        });
        let sortedPerfumers = {};
  
        perfumer.forEach(p => {
            // 假设每个调香师对象都有一个name属性
            const firstLetter = p.perfumer1.charAt(0).toUpperCase(); // 获取名字的首字母并转为大写
            if (!sortedPerfumers[firstLetter]) {
                sortedPerfumers[firstLetter] = []; // 如果这个字母的数组不存在，则创建它
            }
            sortedPerfumers[firstLetter].push(p); // 将调香师添加到对应首字母的数组中
        });

        // 使用处理好的sortedPerfumers数据渲染页面
        res.render('tiaoxiangshi1', { sortedPerfumers: sortedPerfumers });
    } catch (error) {
        console.error('Error fetching perfumers:', error);
        res.status(500).send('Server error');
    }
});
router.get('/perfumerDetail', async (req, res) => {
    const name = req.query.name; // 获取查询参数中的调香师名字
    try {
        // 从你的调香师数据模型中查找该调香师
        const perfumerDetails = await per.findOne({ where: { perfumer1: name } });
        if (!perfumerDetails) {
            return res.status(404).send('Perfumer not found');
        }

        // 使用模糊搜索根据调香师名字查找相关的香水
        const perfumes = await Per.findAll({
            where: {
                perfumer: { [Op.like]: '%' + name + '%' } // 使用模糊搜索
            }
        });

        // 如果找到了调香师和相关香水，渲染详细信息页面并传递数据
        res.render('perfumerDetail', { perfumer: perfumerDetails, perfumes: perfumes });
    } catch (error) {
        console.error('Error fetching perfumer details:', error);
        res.status(500).send('Server error');
    }
});

module.exports = router;
