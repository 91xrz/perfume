const { Op } = require('sequelize');
const Brand=require('../Models/brands');
const Per=require('../Models/perfumeMod');
var express = require('express');
var router = express.Router();

router.get('/',async (req, res) =>{
   
    try {
        const perfumer = await Brand.findAll();
        perfumer.sort((a, b) => {
            if(a.EnglishName < b.EnglishName) return -1;
            if(a.EnglishName > b.EnglishName) return 1;
            return 0;
        });
        let sortedPerfumers = {};
  
        perfumer.forEach(p => {
            if (p.EnglishName) {
            const firstLetter = p.EnglishName.charAt(0).toUpperCase(); // 获取名字的首字母并转为大写
            if (!sortedPerfumers[firstLetter]) {
                sortedPerfumers[firstLetter] = []; // 如果这个字母的数组不存在，则创建它
            }
            sortedPerfumers[firstLetter].push(p); // 将调香师添加到对应首字母的数组中
        }
        });

        // 使用处理好的sortedPerfumers数据渲染页面
        res.render('brand', { sortedPerfumers: sortedPerfumers });
    } catch (error) {
        console.error('Error fetching perfumers:', error);
        res.status(500).send('Server error');
    }

});
router.get('/brandDetail', async (req, res) => {
    const name = req.query.name; // 获取查询参数中的品牌名称

    try {
        // 使用模糊搜索根据品牌的英文名字查找相关的品牌
        const brands = await Brand.findAll({
            where: {
                EnglishName: { [Op.like]: '%' + name + '%' } // 使用模糊搜索
            }
        });

        // 如果找到相关的品牌
        if (brands.length > 0) {
            const brandDetails = brands[0]; // 取第一个找到的品牌

            // 使用模糊搜索根据找到的品牌名称查找相关的香水
            const perfumes = await Per.findAll({
                where: {
                    brand: { [Op.like]: '%' + brandDetails.EnglishName + '%' } // 假设香水模型中有一个 'brand' 字段
                }
            });

            // 渲染详细信息页面并传递品牌和香水数据
            res.render('brandDetail', { brandDetails: brandDetails, perfumes: perfumes });
        } else {
            // 如果没有找到相关的品牌，返回“品牌未找到”的信息
            return res.status(404).send('Brand not found');
        }
    } catch (error) {
        console.error('Error fetching brand details:', error);
        res.status(500).send('Server error');
    }
});


module.exports = router;
