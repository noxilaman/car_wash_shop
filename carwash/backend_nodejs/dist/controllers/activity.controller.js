"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const db = require("../models");
const QueryTypes = require("sequelize").QueryTypes;
const Activity = db.activities;
const Op = db.Sequelize.Op;
// Create and Save a new Tutorial
exports.create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    yield Activity.create(activity)
        .then((data) => {
        res.send(data);
    })
        .catch((err) => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Activity.",
        });
    });
});
// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
    Activity.findAll({ where: condition })
        .then((data) => {
        res.send(data);
    })
        .catch((err) => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving activities.",
        });
    });
};
// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Activity.findByPk(id)
        .then((data) => {
        if (data) {
            res.send(data);
        }
        else {
            res.status(404).send({
                message: `Cannot find Activity with id=${id}.`,
            });
        }
    })
        .catch((err) => {
        res.status(500).send({
            message: err.message || "Error retrieving Activity with id=" + id,
        });
    });
};
// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    Activity.update(req.body, {
        where: { id: id },
    })
        .then((num) => {
        if (num == 1) {
            res.send({
                message: "Activity was updated successfully.",
            });
        }
        else {
            res.send({
                message: `Cannot update Activity with id=${id}. Maybe Activity was not found or req.body is empty!`,
            });
        }
    })
        .catch((err) => {
        res.status(500).send({
            message: err.message || "Error updating Activity with id=" + id,
        });
    });
};
// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Activity.destroy({
        where: { id: id },
    })
        .then((num) => {
        if (num == 1) {
            res.send({
                message: "Activity was deleted successfully!",
            });
        }
        else {
            res.send({
                message: `Cannot delete Activity with id=${id}. Maybe Activity was not found!`,
            });
        }
    })
        .catch((err) => {
        res.status(500).send({
            message: err.message || "Could not delete Activity with id=" + id,
        });
    });
};
// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    Activity.destroy({
        where: {},
        truncate: false,
    })
        .then((nums) => {
        res.send({ message: `${nums} Activitys were deleted successfully!` });
    })
        .catch((err) => {
        res.status(500).send({
            message: err.message || "Some error occurred while removing all activities.",
        });
    });
};
exports.list = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const [data, metadata] = yield Activity.seq.query("SELECT activities.id AS id ,activities.createdAt AS createdate,cars.license_code AS licensecode, cars.city AS licensecity,car_sizes.name AS carsize,wash_types.name AS washtype,activities.price AS price,activities.`status` AS washstatus FROM activities LEFT JOIN cars ON cars.id = activities.car_id LEFT JOIN car_sizes ON car_sizes.id = cars.car_size_id LEFT JOIN wash_types ON wash_types.id = activities.wash_type_id ORDER BY activities.createdAt desc limit 10;");
    if (data) {
        res.send(data);
    }
    else {
        res.status(404).send({
            message: `Cannot find Activity.`,
        });
    }
});
exports.listByShop = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const [data, metadata] = yield Activity.seq.query("SELECT activities.id AS id ,activities.createdAt AS createdate,cars.license_code AS licensecode, cars.city AS licensecity,car_sizes.name AS carsize,wash_types.name AS washtype,activities.price AS price,activities.`status` AS washstatus FROM activities LEFT JOIN cars ON cars.id = activities.car_id LEFT JOIN car_sizes ON car_sizes.id = cars.car_size_id LEFT JOIN wash_types ON wash_types.id = activities.wash_type_id ORDER BY activities.createdAt desc limit 10;");
    if (data) {
        res.send(data);
    }
    else {
        res.status(404).send({
            message: `Cannot find Activity.`,
        });
    }
});
exports.listByOperation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const [data, metadata] = yield Activity.seq.query("SELECT activities.id AS id ,activities.createdAt AS createdate,cars.license_code AS licensecode, cars.city AS licensecity,car_sizes.name AS carsize,wash_types.name AS washtype,activities.price AS price,activities.`status` AS washstatus FROM activities LEFT JOIN cars ON cars.id = activities.car_id LEFT JOIN car_sizes ON car_sizes.id = cars.car_size_id LEFT JOIN wash_types ON wash_types.id = activities.wash_type_id WHERE activities.status not in ('Paid','Reject')  ORDER BY activities.createdAt desc limit 10;");
    if (data) {
        res.send(data);
    }
    else {
        res.status(404).send({
            message: `Cannot find Activity.`,
        });
    }
});
exports.listByCashier = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const [data, metadata] = yield Activity.seq.query("SELECT activities.id AS id ,activities.createdAt AS createdate,cars.license_code AS licensecode, cars.city AS licensecity,car_sizes.name AS carsize,wash_types.name AS washtype,activities.price AS price,activities.`status` AS washstatus, activities.price as washprice  FROM activities LEFT JOIN cars ON cars.id = activities.car_id LEFT JOIN car_sizes ON car_sizes.id = cars.car_size_id LEFT JOIN wash_types ON wash_types.id = activities.wash_type_id WHERE activities.status in ('End')  ORDER BY activities.createdAt desc limit 10;");
    if (data) {
        res.send(data);
    }
    else {
        res.status(404).send({
            message: `Cannot find Activity.`,
        });
    }
});
// Create and Save a new Tutorial
exports.fncreate = (car_id, wash_type_id, price) => __awaiter(void 0, void 0, void 0, function* () {
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
    const result = yield Activity.create(activity);
    if (result === null) {
        console.log("Not found!");
        return [];
    }
    else {
        return result;
    }
});
exports.getcustom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const data = yield Activity.seq.query("SELECT activities.id AS id ,activities.createdAt AS createdate,cars.license_code AS licensecode, cars.city AS licensecity,car_sizes.name AS carsize,wash_types.name AS washtype,activities.price AS price,activities.`status` AS washstatus FROM activities LEFT JOIN cars ON cars.id = activities.car_id LEFT JOIN car_sizes ON car_sizes.id = cars.car_size_id LEFT JOIN wash_types ON wash_types.id = activities.wash_type_id WHERE activities.id = :id  limit 1;", {
        replacements: { id: id },
        type: QueryTypes.SELECT,
    });
    if (data) {
        res.send(data);
    }
    else {
        res.status(404).send({
            message: `Cannot find Activity.`,
        });
    }
});
// Update a Tutorial by the id in the request
exports.updateStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.body.id;
        const status = req.body.status;
        const myactivity = yield Activity.findByPk(id);
        myactivity.status = status;
        myactivity.save();
        res.status(200).send('done');
    }
    catch (error) {
        res.status(404).send({ message: error.message });
    }
});
