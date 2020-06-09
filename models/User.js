const Sequelize = require("sequelize");
const sequelize = require('../config/connection.js');
const bcrypt = require('bcryptjs');
///building User model
const User = sequelize.define('userProfiles', {
    first_name: Sequelize.STRING,
    last_name: Sequelize.STRING,
    userName: Sequelize.STRING,
    passWord: Sequelize.STRING,
    address: Sequelize.STRING
}, { 
    freezeTableName: true,
    timestamps: false
});



User.sync();


module.exports = User;