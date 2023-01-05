require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;
const { QueryTypes } = require("sequelize");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Create and Save a new Tutorial
exports.create = async (req: any, res: any) => {
  // Validate request
  if (!req.body.fname) {
    res.status(400).send({
      message: "license_code can not be empty!",
    });
    return;
  }

  if (!req.body.lname) {
    res.status(400).send({
      message: "city can not be empty!",
    });
    return;
  }

  if (!req.body.mobile) {
    res.status(400).send({
      message: "Car size can not be empty!",
    });
    return;
  }

  if (!req.body.email) {
    res.status(400).send({
      message: "Car size can not be empty!",
    });
    return;
  }

  if (!req.body.password) {
    res.status(400).send({
      message: "Car size can not be empty!",
    });
    return;
  }

  var encyptedPassword = await bcrypt.hash(req.body.password, 10);

  // Create a Tutorial
  const user = {
    fname: req.body.fname,
    lname: req.body.lname,
    mobile: req.body.mobile,
    email: req.body.email,
    password: encyptedPassword,
  };

  // Save Tutorial in the database
  await User.create(user)
    .then((data: any) => {
      res.send(data);
    })
    .catch((err: any) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Car.",
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req: any, res: any) => {
  const fname: string = req.query.fname;
  var condition = fname ? { fname: { [Op.like]: `%${fname}%` } } : null;

  User.findAll({ where: condition })
    .then((data: any) => {
      res.send(data);
    })
    .catch((err: any) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req: any, res: any) => {
  const id: number = req.params.id;

  User.findByPk(id)
    .then((data: any) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Car with id=${id}.`,
        });
      }
    })
    .catch((err: any) => {
      res.status(500).send({
        message: err.message || "Error retrieving User with id=" + id,
      });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req: any, res: any) => {
  const id: number = req.params.id;

  User.update(req.body, {
    where: { id: id },
  })
    .then((num: any) => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`,
        });
      }
    })
    .catch((err: any) => {
      res.status(500).send({
        message: err.message || "Error updating User with id=" + id,
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req: any, res: any) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id },
  })
    .then((num: any) => {
      if (num == 1) {
        res.send({
          message: "Car was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Car with id=${id}. Maybe Car was not found!`,
        });
      }
    })
    .catch((err: any) => {
      res.status(500).send({
        message: err.message || "Could not delete Car with id=" + id,
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req: any, res: any) => {
  User.destroy({
    where: {},
    truncate: false,
  })
    .then((nums: any) => {
      res.send({ message: `${nums} Cars were deleted successfully!` });
    })
    .catch((err: any) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all cars.",
      });
    });
};

exports.fncreate = async (fname: string, lname: string, mobile: string, email: string, password: string) => {
  // Validate request
  if (!fname) {
    return;
  }

  if (!lname) {
    return;
  }

  if (!mobile) {
    return;
  }

  if (!email) {
    return;
  }

  if (!password) {
    return;
  }
var encyptedPassword = await bcrypt.hash(password, 10);
  // Create a Tutorial
  const user = {
    fname: fname,
    lname: lname,
    mobile: mobile,
    email: email,
    password: encyptedPassword,
  };

  // Save Tutorial in the database
  const result = await User.create(user);
  if (result === null) {
    console.log("Not found!");
    return [];
  } else {
    return result;
  }
};

// Update a Tutorial by the id in the request
exports.gentoken = async (req: any, res: any) => {
  try {
    const id: number = req.body.id;
    const token: string = req.body.token;

    const myuser = await User.findByPk(id);

    myuser.status = token;

    myuser.save();

    res.status(200).send("done");
  } catch (error: any) {
    res.status(404).send({message: error.message});
  }
};

exports.login = async (req: any, res: any) => {
  try {
    const { email, password } = req.body;

    // Validate request
    if (!email) {
      res.status(400).send({
        message: "Email can not be empty!",
      });
      return;
    }

    if (!password) {
      res.status(400).send({
        message: "Password can not be empty!",
      });
      return;
    }

    const user = await User.findOne({ where: { email: email } });

    const resultchk = await bcrypt.compare(password, user.password)

    if (user && (await bcrypt.compare(password, user.password))) {

      const token = jwt.sign(
        { id: user.id, email, group_id: user.group_id },
        process.env.JWT_TOKEN_KEY,
        { expiresIn: "2h" }
      );

      user.token = token;
      await user.save();
      return res.status(200).json(user);
    }

    return res.status(401).send({ message: "Login Fail"});
  } catch (error: any) {
    return res.status(401).send({ message: "Error", obj: error });
  }
};

exports.list  = async (req: any, res: any) =>{
  const data = await User.seq.query(
    "SELECT users.id, users.fname, users.lname, users.email , users.mobile, groups.name as groupname FROM users LEFT JOIN groups ON groups.id = users.group_id",
    {
      type: QueryTypes.SELECT,
    }
  );
     if (data) {
       res.send(data);
     } else {
       res.status(404).send({
         message: `Cannot find Users.`,
       });
     }
};
