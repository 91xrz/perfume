const db=require('../routes/db');
const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');

const perfumerModel = db.define('tiaoxianger', {
   
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    perfumer1: {
        type: DataTypes.STRING,
        allowNull: false,
        field:'perfumer',
    },
    Perfume:{
        type: DataTypes.STRING,
        allowNull: false,
        field:'perfume',
    },
    jianjie:{
        type:DataTypes.TEXT,
        allowNull:true,
        field:'简介',
    },

}, {
    freezeTableName: true,
    tableName: 'tiaoxianger', // 确保这个名称与你的数据库表名一致
    timestamps: false, // 假设你的表不包含Sequelize默认的createdAt和updatedAt字段
    
});

module.exports = perfumerModel;

//模型定义完成后，你可以使用模型来查询数据库。例如：
// const student = require('./student');
// const students = await student.findAll();
// console.log(students);