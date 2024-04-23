
const Sequelize = require('sequelize');

const db=new Sequelize('pdata', 'root', '031021xrzXRZ', {
    host: 'sh-cynosdbmysql-grp-5twv5oew.sql.tencentcdb.com',
    dialect: 'mysql',
    logging: false,
    port:28376,
    });

db.authenticate()//判断连接
.then(()=>{
    console.log('连接成功');
})  
.catch(err=>{
    console.error('连接失败', err);
});

module.exports=db;  