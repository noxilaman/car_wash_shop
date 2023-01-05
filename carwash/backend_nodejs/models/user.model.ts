module.exports = (sequelize: any, Sequelize: any) => {
  const User = sequelize.define("users", {
    fname: {
      type: Sequelize.STRING,
    },
    lname: {
      type: Sequelize.STRING,
    },
    mobile: {
      type: Sequelize.STRING(50),
    },
    email: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING(100),
    },
    token: {
      type: Sequelize.STRING,
    },
    group_id: {
      type: Sequelize.INTEGER,
    }
  });

  User.seq = sequelize;
  return User;
};
ç