module.exports = function (sequelize, Sequelize) {
    var Activity = sequelize.define("activities", {
        shop_id: {
            type: Sequelize.INTEGER
        },
        car_id: {
            type: Sequelize.INTEGER
        },
        wash_type_id: {
            type: Sequelize.INTEGER
        },
        status: {
            type: Sequelize.STRING(50)
        },
        note: {
            type: Sequelize.TEXT
        },
        price: {
            type: Sequelize.FLOAT
        }
    });
    Activity.seq = sequelize;
    return Activity;
};
