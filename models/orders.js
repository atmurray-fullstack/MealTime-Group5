var Sequelize = require("sequelize");
const sequelize = require('../config/connection.js');
///building Orders model
const Orders = sequelize.define('orders', {
    userName: Sequelize.STRING,
    restaurant: Sequelize.STRING,
    orders: Sequelize.STRING,
    total: Sequelize.DECIMAL,
    orderDate: Sequelize.DATEONLY
}, { 
    freezeTableName: true,
    timestamps:false
});

Orders.sync();


module.exports = Orders;