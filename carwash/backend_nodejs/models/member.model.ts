module.exports = (sequelize: any, Sequelize: any) => {
  const Member = sequelize.define("members", {
    fname: {
      type: Sequelize.STRING,
    },
    lname: {
      type: Sequelize.STRING,
    },
    mobile: {
      type: Sequelize.STRING(50),
    },
  });

  Member.seq = sequelize;
  return Member;
};
