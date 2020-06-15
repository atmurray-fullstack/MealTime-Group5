module.exports = function (sequelize, DataTypes) {

    var Orders = sequelize.define("orders", {
        userName: {
            type: DataTypes.STRING,
            validate: {
                isEmail: true
            }
        },

        restaurant: {
            type: DataTypes.STRING,
        },
        orders: {
            type: DataTypes.STRING,
        },
        total: {
            type: DataTypes.DECIMAL,
        },
        orderDate: {
            type: DataTypes.DATEONLY,
        },
    });
    return Orders
};
