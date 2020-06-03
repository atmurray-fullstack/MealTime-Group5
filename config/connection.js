const Sequelize = require('sequelize');

const instanceOfSequelize = new Sequelize('mealTime_db', 'root', 'root', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

module.exports = instanceOfSequelize;







connection.connect(function (err) {
    if (err) throw err;
    console.log(connection.state)
});

module.exports = connection;
