export {}
const db: any = require("../models");
const QueryTypes: any = require("sequelize").QueryTypes;
const Activity: any = db.activities;
const Op: any = db.Sequelize.Op;

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

  // Create a Tutorial
  const activity = {
    car_id: req.body.car_id,
    wash_type_id: req.body.wash_type_id,
    status: "Pending",
    note: "",
    price: req.body.price,
  };

  // Save Tutorial in the database
  await Activity.create(activity)
    .then((data: any) => {
      res.send(data);
    })
    .catch((err: any) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Activity.",
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req: any, res: any) => {
  const name: string = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Activity.findAll({ where: condition })
    .then((data: any) => {
      res.send(data);
    })
    .catch((err: any) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving activities.",
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req: any, res: any) => {
  const id: number = req.params.id;

  Activity.findByPk(id)
    .then((data: any) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Activity with id=${id}.`,
        });
      }
    })
    .catch((err: any) => {
      res.status(500).send({
        message: err.message || "Error retrieving Activity with id=" + id,
      });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req: any, res: any) => {
  const id: number = req.params.id;

  Activity.update(req.body, {
    where: { id: id },
  })
    .then((num: any) => {
      if (num == 1) {
        res.send({
          message: "Activity was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Activity with id=${id}. Maybe Activity was not found or req.body is empty!`,
        });
      }
    })
    .catch((err: any) => {
      res.status(500).send({
        message: err.message ||"Error updating Activity with id=" + id,
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req: any, res: any) => {
  const id: number = req.params.id;

  Activity.destroy({
    where: { id: id },
  })
    .then((num: any) => {
      if (num == 1) {
        res.send({
          message: "Activity was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Activity with id=${id}. Maybe Activity was not found!`,
        });
      }
    })
    .catch((err: any) => {
      res.status(500).send({
        message: err.message || "Could not delete Activity with id=" + id,
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req: any, res: any) => {
  Activity.destroy({
    where: {},
    truncate: false,
  })
    .then((nums: any) => {
      res.send({ message: `${nums} Activitys were deleted successfully!` });
    })
    .catch((err: any) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all activities.",
      });
    });
};

exports.list = async (req: any, res: any) =>{
   const [data, metadata]  = await Activity.seq.query(
     "SELECT activities.id AS id ,activities.createdAt AS createdate,cars.license_code AS licensecode, cars.city AS licensecity,car_sizes.name AS carsize,wash_types.name AS washtype,activities.price AS price,activities.`status` AS washstatus FROM activities LEFT JOIN cars ON cars.id = activities.car_id LEFT JOIN car_sizes ON car_sizes.id = cars.car_size_id LEFT JOIN wash_types ON wash_types.id = activities.wash_type_id ORDER BY activities.createdAt desc limit 10;"
   );
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Activity.`,
        });
      }
};

exports.listByShop = async (req: any, res: any) => {

  const [data, metadata] = await Activity.seq.query(
    "SELECT activities.id AS id ,activities.createdAt AS createdate,cars.license_code AS licensecode, cars.city AS licensecity,car_sizes.name AS carsize,wash_types.name AS washtype,activities.price AS price,activities.`status` AS washstatus FROM activities LEFT JOIN cars ON cars.id = activities.car_id LEFT JOIN car_sizes ON car_sizes.id = cars.car_size_id LEFT JOIN wash_types ON wash_types.id = activities.wash_type_id ORDER BY activities.createdAt desc limit 10;"
  );
  if (data) {
    res.send(data);
  } else {
    res.status(404).send({
      message: `Cannot find Activity.`,
    });
  }
};

exports.listByOperation = async (req: any, res: any) => {

  const [data, metadata] = await Activity.seq.query(
    "SELECT activities.id AS id ,activities.createdAt AS createdate,cars.license_code AS licensecode, cars.city AS licensecity,car_sizes.name AS carsize,wash_types.name AS washtype,activities.price AS price,activities.`status` AS washstatus FROM activities LEFT JOIN cars ON cars.id = activities.car_id LEFT JOIN car_sizes ON car_sizes.id = cars.car_size_id LEFT JOIN wash_types ON wash_types.id = activities.wash_type_id WHERE activities.status not in ('Paid','Reject')  ORDER BY activities.createdAt desc limit 10;"
  );
  if (data) {
    res.send(data);
  } else {
    res.status(404).send({
      message: `Cannot find Activity.`,
    });
  }
};

exports.listByCashier = async (req: any, res: any) => {

  const [data, metadata] = await Activity.seq.query(
    "SELECT activities.id AS id ,activities.createdAt AS createdate,cars.license_code AS licensecode, cars.city AS licensecity,car_sizes.name AS carsize,wash_types.name AS washtype,activities.price AS price,activities.`status` AS washstatus, activities.price as washprice  FROM activities LEFT JOIN cars ON cars.id = activities.car_id LEFT JOIN car_sizes ON car_sizes.id = cars.car_size_id LEFT JOIN wash_types ON wash_types.id = activities.wash_type_id WHERE activities.status in ('End')  ORDER BY activities.createdAt desc limit 10;"
  );
  if (data) {
    res.send(data);
  } else {
    res.status(404).send({
      message: `Cannot find Activity.`,
    });
  }
};

// Create and Save a new Tutorial
exports.fncreate = async (car_id: number, wash_type_id: number, price: number) => {
  // Validate request
  if (!car_id) {
    return;
  }

  if (!wash_type_id) {
    return;
  }

  if (!price) {
    return;
  }

  // Create a Tutorial
  const activity = {
    car_id: car_id,
    wash_type_id: wash_type_id,
    status: "Pending",
    note: "",
    price: price,
  };

  // Save Tutorial in the database
  const result = await Activity.create(activity);
  if (result === null) {
    console.log("Not found!");
    return [];
  } else {
    return result;
  }
};

exports.getcustom = async (req: any, res: any) =>{
  const id: number = req.params.id;
   const data = await Activity.seq.query(
     "SELECT activities.id AS id ,activities.createdAt AS createdate,cars.license_code AS licensecode, cars.city AS licensecity,car_sizes.name AS carsize,wash_types.name AS washtype,activities.price AS price,activities.`status` AS washstatus FROM activities LEFT JOIN cars ON cars.id = activities.car_id LEFT JOIN car_sizes ON car_sizes.id = cars.car_size_id LEFT JOIN wash_types ON wash_types.id = activities.wash_type_id WHERE activities.id = :id  limit 1;",
     {
       replacements: { id: id },
       type: QueryTypes.SELECT,
     }
   );
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Activity.`,
        });
      }
};

// Update a Tutorial by the id in the request
exports.updateStatus = async (req: any, res: any) => {
    try {
        const id: number = req.body.id;
        const status: string = req.body.status;

        const myactivity = await Activity.findByPk(id);

        myactivity.status = status;

        myactivity.save();

        res.status(200).send('done');

    } catch (error: any) {
        res.status(404).send({message: error.message });
    }
  
};
    