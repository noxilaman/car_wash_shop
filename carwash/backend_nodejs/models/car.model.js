module.exports = function (sequelize, Sequelize) {
    var Car = sequelize.define("cars", {
        license_code: {
            type: Sequelize.STRING
        },
        city: {
            type: Sequelize.STRING
        },
        car_size_id: {
            type: Sequelize.INTEGER
        },
        note: {
            type: Sequelize.TEXT
        },
        photo: {
            type: Sequelize.TEXT
        }
    });
    Car.seq = sequelize;
    return Car;
};
