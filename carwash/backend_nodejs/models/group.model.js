module.exports = function (sequelize, Sequelize) {
    var Group = sequelize.define("groups", {
        name: {
            type: Sequelize.STRING
        },
        desc: {
            type: Sequelize.TEXT
        }
    });
    Group.seq = sequelize;
    return Group;
};
