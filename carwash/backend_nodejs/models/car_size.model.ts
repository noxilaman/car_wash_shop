module.exports = (sequelize: any, Sequelize: any) => {
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
