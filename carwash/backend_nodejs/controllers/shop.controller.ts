const db = require("../models");
const Shop = db.shops;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = async (req: any, res: any) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "name can not be empty!",
    });
    return;
  }

  // Create a Tutorial
  const shop = {
    name: req.body.name,
    logo: req.body.logo,
    tel: req.body.tel,
    line: req.body.line,
    address: req.body.address,
  };

  // Save Tutorial in the database
  await Shop.create(shop)
    .then((data: any) => {
      res.send(data);
    })
    .catch((err: any) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Shop.",
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req: any, res: any) => { 
    const name: string = req.query.name;
    var condition = name
      ? { name: { [Op.like]: `%${name}%` } }
      : null;

    Shop.findAll({ where: condition })
      .then((data: any) => {
        res.send(data);
      })
      .catch((err: any) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving shops.",
        });
      });
};

// Find a single Tutorial with an id
exports.findOne = (req: any, res: any) => {
    const id: number = req.params.id;

    Shop.findByPk(id)
      .then((data: any) => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Shop with id=${id}.`,
          });
        }
      })
      .catch((err: any) => {
        res.status(500).send({
          message: err.message || "Error retrieving Shop with id=" + id,
        });
      });
};

// Update a Tutorial by the id in the request
exports.update = (req: any, res: any) => {
    const id: number = req.params.id;

    Shop.update(req.body, {
      where: { id: id },
    })
      .then((num: any) => {
        if (num == 1) {
          res.send({
            message: "Shop was updated successfully.",
          });
        } else {
          res.send({
            message: `Cannot update Shop with id=${id}. Maybe Shop was not found or req.body is empty!`,
          });
        }
      })
      .catch((err: any) => {
        res.status(500).send({
          message: err.message || "Error updating Shop with id=" + id,
        });
      });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req: any, res: any) => {
    const id: number = req.params.id;

    Shop.destroy({
      where: { id: id },
    })
      .then((num: any) => {
        if (num == 1) {
          res.send({
            message: "Shop was deleted successfully!",
          });
        } else {
          res.send({
            message: `Cannot delete Shop with id=${id}. Maybe Shop was not found!`,
          });
        }
      })
      .catch((err: any) => {
        res.status(500).send({
          message: err.message || "Could not delete Shop with id=" + id,
        });
      });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req: any, res: any) => {
    Shop.destroy({
      where: {},
      truncate: false,
    })
      .then((nums: any) => {
        res.send({ message: `${nums} Shops were deleted successfully!` });
      })
      .catch((err: any) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all shops.",
        });
      });
};

exports.haveCar = async (name: string) => {
  var condition = {
    name: name,
  };

  const result = await Shop.findAll({ where: condition });
  if (result === null) {
    console.log("Not found!");
    return [];
  } else {
    return result;
  }
};

exports.fncreate = async (name: string, logo: string, tel: string, line: string, address: string) => {
  // Validate request
  if (!name) {
    return;
  }

  // Create a Tutorial
  const shop = {
    name: name,
    logo: logo,
    tel: tel,
    line: line,
    address: address
  };

  // Save Tutorial in the database
  const result = await Shop.create(shop);
  if (result === null) {
    console.log("Not found!");
    return [];
  } else {
    return result;
  }
};
