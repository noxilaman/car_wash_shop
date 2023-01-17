"use strict";
module.exports = (sequelize, Sequelize) => {
    const Price = sequelize.define("prices", {
        wash_type_id: {
            type: Sequelize.INTEGER,
        },
        car_size_id: {
            type: Sequelize.INTEGER,
        },
        price: {
            type: Sequelize.FLOAT,
        },
    });
    Price.seq = sequelize;
    return Price;
};
