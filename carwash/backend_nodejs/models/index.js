var dbConfig = require("../config/db.config");
var Sequelize = require("sequelize");
var sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});
var db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.members = require("./member.model")(sequelize, Sequelize);
db.cars = require("./car.model")(sequelize, Sequelize);
db.activities = require("./activity.model")(sequelize, Sequelize);
db.car_sizes = require("./car_size.model")(sequelize, Sequelize);
db.prices = require("./price.model")(sequelize, Sequelize);
db.wash_types = require("./wash_type.model")(sequelize, Sequelize);
db.users = require("./user.model")(sequelize, Sequelize);
db.shops = require("./shop.model")(sequelize, Sequelize);
db.groups = require("./group.model")(sequelize, Sequelize);
module.exports = db;
