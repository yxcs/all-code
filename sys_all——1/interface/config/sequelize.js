const Sequelize = require('sequelize');
const sequelize = new Sequelize('manage_system', 'root', 'P@22word', {
  host: '47.104.141.127',
  dialect: 'mysql',
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  logging: console.log
})
sequelize
  .authenticate()
  .then(() => {
    console.log('MYSQL 连接成功......');
  })
  .catch(err => {
    console.error('链接失败:', err);
  });
// 根据模型自动创建表
sequelize.sync()
module.exports = sequelize