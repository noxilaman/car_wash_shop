const db = require("../models");
const WashType = db.wash_types;
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

  const chk = await WashType.findAll({ where: condition });
  if (chk.length > 0) {
    res.status(401).send({
      message: "Already have prices!",
    });
    return;
  }

  // Create a Tutorial
  const washtype = {
    name: req.body.name,
    desc: req.body.desc,
  };

  // Save Tutorial in the database
  await WashType.create(washtype)
    .then((data: any) => {
      res.send(data);
    })
    .catch((err: any) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Wash Type.",
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req: any, res: any) => { 
    const name: string = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

    WashType.findAll({ where: condition })
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

    WashType.findByPk(id)
      .then((data: any) => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Wash Type with id=${id}.`,
          });
        }
      })
      .catch((err: any) => {
        res.status(500).send({
          message: err.message || "Error retrieving Wash Type with id=" + id,
        });
      });
};

// Update a Tutorial by the id in the request
exports.update = (req: any, res: any) => {
    const id: number = req.params.id;

    WashType.update(req.body, {
      where: { id: id },
    })
      .then((num: any) => {
        if (num == 1) {
          res.send({
            message: "Wash Type was updated successfully.",
          });
        } else {
          res.send({
            message: `Cannot update Wash Type with id=${id}. Maybe Wash Type was not found or req.body is empty!`,
          });
        }
      })
      .catch((err: any) => {
        res.status(500).send({
          message: err.message || "Error updating Wash Type with id=" + id,
        });
      });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req: any, res: any) => {
    const id: number = req.params.id;

    WashType.destroy({
      where: { id: id },
    })
      .then((num: any) => {
        if (num == 1) {
          res.send({
            message: "Wash Type was deleted successfully!",
          });
        } else {
          res.send({
            message: `Cannot delete Wash Type with id=${id}. Maybe Wash Type was not found!`,
          });
        }
      })
      .catch((err: any) => {
        res.status(500).send({
          message: err.message || "Could not delete Wash Type with id=" + id,
        });
      });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req: any, res: any) => {
    WashType.destroy({
      where: {},
      truncate: false,
    })
      .then((nums: any) => {
        res.send({ message: `${nums} Wash Types were deleted successfully!` });
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

  const chk = await WashType.findAll({ where: condition });
  if (chk.length > 0) {
    return;
  }

  // Create a Tutorial
  const washType = {
    name: name,
    desc: desc,
  };

  // Save Tutorial in the database
  const result = await WashType.create(washType);
  if (result === null) {
    console.log("Not found!");
    return [];
  } else {
    return result;
  }
};

exports.findByName = async (name: string) => {
  const result = await WashType.findAll({ where: { name: name } });
  return result;
};
