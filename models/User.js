
///building User model
module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define('userProfiles', {
        first_name: {
            type: DataTypes.STRING
        },
        last_name: {
            type: DataTypes.STRING
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        passWord: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING
        }

    });
    return User

};


