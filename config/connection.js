const Sequelize = require('sequelize');

if(process.env.JAWSDB_URL){
   const sequilize = new Sequelize(process.env.JAWSDB_URL);
}else{
const sequelize = new Sequelize('mealTime_db', 'root', 'root', {
    host: '127.0.0.1',
    port: 3307,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

module.exports = sequelize;










