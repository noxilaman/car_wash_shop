const db = require("../models");
const Group = db.groups;
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

  if (!req.body.desc) {
    res.status(400).send({
      message: "desc can not be empty!",
    });
    return;
  }

  var condition = {
    name: req.body.name,
  };

  const chk = await Group.findAll({ where: condition });
  if (chk.length > 0) {
    res.status(401).send({
      message: "Already have prices!",
    });
    return;
  }

  // Create a Tutorial
  const group = {
    name: req.body.name,
    desc: req.body.desc,
  };

  // Save Tutorial in the database
  await Group.create(group)
    .then((data: any) => {
      res.send(data);
    })
    .catch((err: any) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Group.",
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req: any, res: any) => { 
    const name: string = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

    Group.findAll({ where: condition })
      .then((data: any) => {
        res.send(data);
      })
      .catch((err: any) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving wash_types.",
        });
      });
};

// Find a single Tutorial with an id
exports.findOne = (req: any, res: any) => {
    const id: number = req.params.id;

    Group.findByPk(id)
      .then((data: any) => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Group with id=${id}.`,
          });
        }
      })
      .catch((err: any) => {
        res.status(500).send({
          message: err.message || "Error retrieving Group with id=" + id,
        });
      });
};

// Update a Tutorial by the id in the request
exports.update = (req: any, res: any) => {
    const id: number = req.params.id;

    Group.update(req.body, {
      where: { id: id },
    })
      .then((num: any) => {
        if (num == 1) {
          res.send({
            message: "Group was updated successfully.",
          });
        } else {
          res.send({
            message: `Cannot update Group with id=${id}. Maybe Group was not found or req.body is empty!`,
          });
        }
      })
      .catch((err: any) => {
        res.status(500).send({
          message: err.message || "Error updating Group with id=" + id,
        });
      });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req: any, res: any) => {
    const id: number = req.params.id;

    Group.destroy({
      where: { id: id },
    })
      .then((num: any) => {
        if (num == 1) {
          res.send({
            message: "Group was deleted successfully!",
          });
        } else {
          res.send({
            message: `Cannot delete Group with id=${id}. Maybe Group was not found!`,
          });
        }
      })
      .catch((err: any) => {
        res.status(500).send({
          message: err.message || "Could not delete Group with id=" + id,
        });
      });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req: any, res: any) => {
    Group.destroy({
      where: {},
      truncate: false,
    })
      .then((nums: any) => {
        res.send({ message: `${nums} Groups were deleted successfully!` });
      })
      .catch((err: any) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all wash_types.",
        });
      });
};

exports.fncreate = async (name: string, desc: string) => {
  // Validate request
  // Validate request
  if (!name) {
    return;
  }

  if (!desc) {
    return;
  }

  var condition = {
    name: name,
  };

  const chk = await Group.findAll({ where: condition });
  if (chk.length > 0) {
    return;
  }

  // Create a Tutorial
  const washType = {
    name: name,
    desc: desc,
  };

  // Save Tutorial in the database
  const result = await Group.create(washType);
  if (result === null) {
    console.log("Not found!");
    return [];
  } else {
    return result;
  }
};

exports.findByName = async (name: string) => {
  const result = await Group.findAll({ where: { name: name } });
  return result;
};
