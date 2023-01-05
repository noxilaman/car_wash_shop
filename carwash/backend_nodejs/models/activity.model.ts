module.exports = (sequelize: any, Sequelize: any) => {
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
  });

  Activity.seq = sequelize;
  return Activity;
};