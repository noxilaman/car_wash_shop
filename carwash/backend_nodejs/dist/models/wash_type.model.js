"use strict";
module.exports = (sequelize, Sequelize) => {
    const WashType = sequelize.define("wash_types", {
        name: {
            type: Sequelize.STRING,
        },
        desc: {
            type: Sequelize.TEXT,
        },
    });
    WashType.seq = sequelize;
    return WashType;
};
