var Sequelize = require("sequelize");
const sequelize = require('../config/connection.js');


const User = sequelize.define('userProfiles', {
    first_name: Sequelize.STRING,
    last_name: Sequelize.STRING,
    userName: Sequelize.STRING,
    passWord: Sequelize.STRING,
    address: Sequelize.STRING
}, { freezeTableName: true });

User.sync({ force: true });


module.exports = User;