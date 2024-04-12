var express = require('express');
var router = express.Router();
const Per = require('../Models/shalong'); // 请确保路径和文件名正确

// 处理对应香水详情页的请求
router.get('/:id', async (req, res) => {
    try {
        const perfumeId = req.params.id; // 从 URL 获取香水 ID
        const perfume = await Per.findByPk(perfumeId); // 从数据库中查找对应的香水信息
        const dataType = 'shalong'; // 或者 'shangye'，根据实际情况设置
        if (perfume) {
            res.render('ss', { perfume: perfume, dataType: dataType }); // 渲染详情页面并传递香水信息和 dataType
        } else {
            res.status(404).send('Perfume not found'); // 如果没有找到香水，返回404错误
        }
    } catch (error) {
        console.error('Error fetching perfume details:', error);
        res.status(500).send('Server error'); // 处理可能的服务器错误
    }
});



module.exports = router;