"use strict";
module.exports = (sequelize, Sequelize) => {
    const Activity = sequelize.define("activities", {
        car_id: {
            type: Sequelize.INTEGER,
        },
        wash_type_id: {
            type: Sequelize.INTEGER,
        },
        status: {
            type: Sequelize.STRING(50),
        },
        note: {
            type: Sequelize.TEXT,
        },
        price: {
            type: Sequelize.FLOAT,
        },
        photo: {
            type: Sequelize.STRING,
        },
    });
    Activity.seq = sequelize;
    return Activity;
};
