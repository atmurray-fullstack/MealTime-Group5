const Sequelize = require('sequelize');

<<<<<<< HEAD
const sequelize = new Sequelize('mealTime_db', 'root', 'Cl@u0218', {
=======
const sequelize = new Sequelize('mealTime_db', 'root', 'root', {
>>>>>>> 9f4cfcffa0b58802536b9c9216d031e1f46de2b0
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










