"use strict";
module.exports = (sequelize, Sequelize) => {
    const CarSize = sequelize.define("car_sizes", {
        name: {
            type: Sequelize.STRING,
        },
        desc: {
            type: Sequelize.TEXT,
        },
    });
    CarSize.seq = sequelize;
    return CarSize;
};
