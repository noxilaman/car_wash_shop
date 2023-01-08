export {}
const db: any = require("../models");
const Car: any = db.cars;
const Op: any = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = async  (req: any, res: any) => {
  // Validate request
  if (!req.body.license_code) {
    res.status(400);
res.send({
      message: "license_code can not be empty!",
    });
    return;
  }

  if (!req.body.city) {
    res.status(400);
res.send({
      message: "city can not be empty!",
    });
    return;
  }

  if (!req.body.car_size_id) {
    res.status(400);
    res.send({
      message: "Car size can not be empty!",
    });
    return;
  }

  var condition: any = {
    license_code: req.body.license_code,
    city: req.body.city,
    car_size_id: req.body.car_size_id,
  };

  const result: any = await Car.findAll({ where: condition });
  if (result.length > 0) {
    res.status(400);
    res.send({
      message: "Already have prices!",
    });
    return;
  }

  // Create a Tutorial
  const car = {
    license_code: req.body.license_code,
    city: req.body.city,
    car_size_id: req.body.car_size_id,
    note: req.body.note,
  };

  // Save Tutorial in the database
  await Car.create(car)
    .then((data: any) => {
      res.status(200);
      res.send(data);
    })
    .catch((err: any) => {
      res.status(500);
      res.send({
        message: err.message || "Some error occurred while creating the Car.",
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = async (req: any, res: any) => { 
    const license_code = req.query.license_code;
    var condition = license_code
      ? { license_code: { [Op.like]: `%${license_code}%` } }
      : null;

    await Car.findAll({ where: condition })
  .then((data: any) => {
    res.status(200);
    res.send(data);
  })
  .catch((err: any) => {
    res.status(500);
res.send({
      message: err.message || "Some error occurred while retrieving cars.",
    });
  });
};

// Find a single Tutorial with an id
exports.findOne = async (req: any, res: any) => {
    const id: number = req.params.id;

    await Car.findByPk(id)
      .then((data: any) => {
        if (data) {
          res.status(200);
          res.send(data);
        } else {
          res.status(404);
res.send({
            message: `Cannot find Car with id=${id}.`,
          });
        }
      })
      .catch((err) => {
        res.status(500);
        res.send({
          message: err.message ||"Error retrieving Car with id=" + id,
        });
      });
};

// Update a Tutorial by the id in the request
exports.update = async (req: any, res: any) => {
    if (!req.params.id) {
      res.status(400);
  res.send({
        message: "id can not be empty!",
      });
      return;
    }

    const id: number = req.params.id;

    if (!req.body.license_code) {
      res.status(400);
  res.send({
        message: "license_code can not be empty!",
      });
      return;
    }

    await Car.findByPk(id)
      .then((data: any) => {
        if (data.length == 1) {
          res.status(404);
res.send({
            message: `Cannot find Car with id=${id}.`,
          });
        }
      })
      .catch((err) => {
        res.status(500);
        res.send({
          message: err.message ||"Error retrieving Car with id=" + id,
        });
      });

    var condition: any = {
      license_code: req.body.license_code,
      [Op.not]: [{id: id}]
    };
  

    const result: any = await Car.findAll({ where: condition });

    if (result) {
      res.status(400);
      res.send({
        message: "Can't update duplicate license_code.",
      });
      return;
    }

    await Car.update(req.body, {
      where: { id: id },
    })
      .then((num: any) => {
        if (num == 1) {
          res.status(200);
          res.send({
            message: "Car was updated successfully.",
          });
        } else {
          res.status(404);
          res.send({
            message: `Cannot update Car with id=${id}. Maybe Car was not found or req.body is empty!`,
          });
        }
      })
      .catch((err: any) => {
        res.status(500);
        res.send({
          message:  err.message || "Error updating Car with id=" + id,
        });
      });
};

// Delete a Tutorial with the specified id in the request
exports.delete =  (req: any, res: any) => {
    const id: number = req.params.id;

    Car.destroy({
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
        res.status(500);
res.send({
          message:  err.message || "Could not delete Car with id=" + id,
        });
      });
};

// Delete all Tutorials from the database.
exports.deleteAll = async (req: any, res: any) => {
    await Car.destroy({
      where: {},
      truncate: false,
    })
      .then((nums: any) => {
        res.send({ message: `${nums} Cars were deleted successfully!` });
      })
      .catch((err: any) => {
        res.status(500);
res.send({
          message:
            err.message || "Some error occurred while removing all cars.",
        });
      });
};

exports.haveCar = async (license_code: string, city: string) => {
  var condition = {
    license_code: license_code,
    city: city,
  };

  const result = await Car.findAll({ where: condition });
  if (result === null) {
    console.log("Not found!");
    return [];
  } else {
    return result;
  }
};

exports.fncreate = async (license_code: string, city: string, car_size_id: number) => {
  // Validate request
  if (!license_code) {
    return;
  }

  if (!city) {
    return;
  }

  if (!car_size_id) {
    return;
  }

  var condition = {
    license_code: license_code,
    city: city,
    car_size_id: car_size_id,
  };

  const chk = await Car.findAll({ where: condition });
  if (chk.length > 0) {
    return;
  }

  // Create a Tutorial
  const car = {
    license_code: license_code,
    city: city,
    car_size_id: car_size_id,
    note: '',
  };

  // Save Tutorial in the database
  const result = await Car.create(car);
  if (result === null) {
    console.log("Not found!");
    return [];
  } else {
    return result;
  }
};
