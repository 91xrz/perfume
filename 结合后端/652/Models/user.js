const db=require('../routes/db');
const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');



const perModel = db.define('user', {
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
   UserName: {
        type: DataTypes.STRING,
        allowNull: false,
        field:'name'
    },
    Password: {
        type: DataTypes.STRING,
        allowNull: false,
        field:'password'
    },
    Email: {
        type: DataTypes.STRING,
        allowNull: false,
        field:'email'
    },
    Gender: {
        type: DataTypes.STRING,
        allowNull: true,
        field:'gender'
    },
    jianjie: {
        type: DataTypes.TEXT,
        allowNull: true,
        field:'jianjie'
    },
}, {
   
   // modelName: 'Student',
    // 如果你不想使用Sequelize自动生成的复数形式表名（students），可以显式指定表名
    freezeTableName: true,
    tableName: 'user', // 确保这个名称与你的数据库表名一致
    timestamps: false, // 假设你的表不包含Sequelize默认的createdAt和updatedAt字段
    
});

module.exports = perModel;
