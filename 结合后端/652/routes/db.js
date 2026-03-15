
const Sequelize = require('sequelize');

const dbConfig = {
    database: process.env.DB_NAME || 'pdata',
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    host: process.env.DB_HOST || '127.0.0.1',
    port: Number(process.env.DB_PORT || 3306),
    dialect: 'mysql',
    logging: false,
};

const db = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    logging: dbConfig.logging,
    port: dbConfig.port,
});

db.authenticate() // 判断连接
    .then(() => {
        console.log(`MySQL连接成功: ${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`);
    })
    .catch((err) => {
        console.error('MySQL连接失败', err);
    });

module.exports = db;
