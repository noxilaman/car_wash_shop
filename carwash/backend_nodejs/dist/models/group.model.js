"use strict";
module.exports = (sequelize, Sequelize) => {
    const Group = sequelize.define("groups", {
        name: {
            type: Sequelize.STRING,
        },
        desc: {
            type: Sequelize.TEXT,
        },
    });
    Group.seq = sequelize;
    return Group;
};
