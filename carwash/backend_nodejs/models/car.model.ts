module.exports = (sequelize: any, Sequelize: any) => {
  const Car = sequelize.define("cars", {
    license_code: {
      type: Sequelize.STRING,
    },
    city: {
      type: Sequelize.STRING,
    },
    car_size_id: {
      type: Sequelize.INTEGER,
    },
    note: {
      type: Sequelize.TEXT,
    },
    photo: {
      type: Sequelize.TEXT,
    },
  });
  Car.seq = sequelize;
  return Car;
};
