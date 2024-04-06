const db=require('../routes/db');
const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');

const perModel = db.define('香水总数据', {
   
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    perfumeName: {
        type: DataTypes.STRING,
        allowNull: false,
        field:'香水名'

    },
    brand:{
        type: DataTypes.STRING,
        allowNull: false,
        field:'品牌'
    },
    perfumer: {
        type: DataTypes.STRING,
        allowNull: false,
        field:'调香师'
    },
    score: {
        type: DataTypes.FLOAT,
        allowNull: false,
        field:'评分',
    },
    qiandiao: {
        type: DataTypes.STRING,
        allowNull: true ,// 根据你的需求调整
        field:'前调'
    },
    zhongdiao: {
        type: DataTypes.STRING,
        allowNull: true, // 根据你的需求调整
        field:'中调',
    },
    houdiao: {
        type: DataTypes.STRING,
        allowNull: true, // 根据你的需求调整,
        field:'后调',
    },
    xiangdiao:{
        type:DataTypes.STRING,
        allowNull:true,
        field:'香调',
    },
    shuxing:{
        type:DataTypes.STRING,
        allowNull:true,
        field:'属性',
    },
    xingge:{
        type:DataTypes.STRING,
        allowNull:true,
        field:'性格',
    },
    changjing:{
        type:DataTypes.STRING,
        allowNull:true,
        field:'场景',
    },
    qiwei:{
        type:DataTypes.STRING,
        allowNull:true,
        field:'气味',
    },
    biaoqian:{
        type:DataTypes.STRING,
        allowNull:true,
        field:'标签',
    },
}, {
    //sequelize,
   // modelName: 'Student',
    // 如果你不想使用Sequelize自动生成的复数形式表名（students），可以显式指定表名
    freezeTableName: true,
    tableName: '香水总数据', // 确保这个名称与你的数据库表名一致
    timestamps: false, // 假设你的表不包含Sequelize默认的createdAt和updatedAt字段
    
});

module.exports = perModel;

//模型定义完成后，你可以使用模型来查询数据库。例如：
// const student = require('./student');
// const students = await student.findAll();
// console.log(students);