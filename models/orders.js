var Sequelize = require("sequelize");
const sequelize = require('../config/connection.js');

const Orders = sequelize.define('orders', {
    userName: Sequelize.STRING,
    restaurant: Sequelize.STRING,
    order: Sequelize.STRING,
    total: Sequelize.DECIMAL,
    orderDate: Sequelize.DATEONLY
}, { freezeTableName: true });

Orders.sync({ force: true });


module.exports = Orders;