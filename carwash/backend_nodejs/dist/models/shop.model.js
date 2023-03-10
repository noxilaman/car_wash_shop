"use strict";
module.exports = (sequelize, Sequelize) => {
    const Shop = sequelize.define("shops", {
        name: {
            type: Sequelize.STRING,
        },
        logo: {
            type: Sequelize.STRING,
        },
        tel: {
            type: Sequelize.STRING,
        },
        line: {
            type: Sequelize.STRING,
        },
        address: {
            type: Sequelize.TEXT,
        },
    });
    Shop.seq = sequelize;
    return Shop;
};
