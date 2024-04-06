const { Op } = require('sequelize');
const per=require('../Models/shalong');
const per1=require('../Models/shangye');
var express = require('express');
var router = express.Router();


router.get('/:type', async (req, res) => {
    try {
        let data, dataType;
        switch (req.params.type) {
            case 'shalong':
                data = await per.findAll({ order: [['Rank', 'ASC']] });
                dataType = 'shalong';
                break;
            case 'shangye':
                data = await per1.findAll({ order: [['Rank', 'ASC']] });
                dataType = 'shangye';
                break;
            default:
                return res.status(400).send('Invalid type');
        }
        // 传递额外的dataType变量到模板
        res.render('rank', { noses: data, dataType: dataType });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Server error');
    }
});

module.exports = router;