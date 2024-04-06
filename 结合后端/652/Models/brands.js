const db=require('../routes/db');
const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');



const perModel = db.define('brand', {
   
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    BrandName: {
        type: DataTypes.STRING,
        allowNull: false,
        field:'品牌'

    },
    EnglishName: {
        type: DataTypes.STRING,
        allowNull: false,
        field:'英文名'
    },
    jianjie: {
        type: DataTypes.TEXT,
        allowNull: false,
        field:'简介',
    },
}, {
    //sequelize,
   // modelName: 'Student',
    // 如果你不想使用Sequelize自动生成的复数形式表名（students），可以显式指定表名
    freezeTableName: true,
    tableName: 'brand', // 确保这个名称与你的数据库表名一致
    timestamps: false, // 假设你的表不包含Sequelize默认的createdAt和updatedAt字段
    
});

module.exports = perModel;
