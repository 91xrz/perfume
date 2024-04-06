
const Sequelize = require('sequelize');

const db=new Sequelize('data', 'root', '031021', {
    host: 'localhost',
    
    dialect: 'mysql',
    logging: false,
    port:3306,
    });

db.authenticate()//判断连接
.then(()=>{
    console.log('连接成功');
})  
.catch(err=>{
    console.error('连接失败', err);
});

module.exports=db;  