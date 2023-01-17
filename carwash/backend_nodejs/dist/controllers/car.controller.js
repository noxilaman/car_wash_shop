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
const Car = db.cars;
const Op = db.Sequelize.Op;
// Create and Save a new Tutorial
exports.create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    var condition = {
        license_code: req.body.license_code,
        city: req.body.city,
        car_size_id: req.body.car_size_id,
    };
    const result = yield Car.findAll({ where: condition });
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
    yield Car.create(car)
        .then((data) => {
        res.status(200);
        res.send(data);
    })
        .catch((err) => {
        res.status(500);
        res.send({
            message: err.message || "Some error occurred while creating the Car.",
        });
    });
});
// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const license_code = req.query.license_code;
    var condition = license_code
        ? { license_code: { [Op.like]: `%${license_code}%` } }
        : null;
    yield Car.findAll({ where: condition })
        .then((data) => {
        res.status(200);
        res.send(data);
    })
        .catch((err) => {
        res.status(500);
        res.send({
            message: err.message || "Some error occurred while retrieving cars.",
        });
    });
});
// Find a single Tutorial with an id
exports.findOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    yield Car.findByPk(id)
        .then((data) => {
        if (data) {
            res.status(200);
            res.send(data);
        }
        else {
            res.status(404);
            res.send({
                message: `Cannot find Car with id=${id}.`,
            });
        }
    })
        .catch((err) => {
        res.status(500);
        res.send({
            message: err.message || "Error retrieving Car with id=" + id,
        });
    });
});
// Update a Tutorial by the id in the request
exports.update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.id) {
        res.status(400);
        res.send({
            message: "id can not be empty!",
        });
        return;
    }
    const id = req.params.id;
    if (!req.body.license_code) {
        res.status(400);
        res.send({
            message: "license_code can not be empty!",
        });
        return;
    }
    yield Car.findByPk(id)
        .then((data) => {
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
            message: err.message || "Error retrieving Car with id=" + id,
        });
    });
    var condition = {
        license_code: req.body.license_code,
        [Op.not]: [{ id: id }]
    };
    const result = yield Car.findAll({ where: condition });
    if (result) {
        res.status(400);
        res.send({
            message: "Can't update duplicate license_code.",
        });
        return;
    }
    yield Car.update(req.body, {
        where: { id: id },
    })
        .then((num) => {
        if (num == 1) {
            res.status(200);
            res.send({
                message: "Car was updated successfully.",
            });
        }
        else {
            res.status(404);
            res.send({
                message: `Cannot update Car with id=${id}. Maybe Car was not found or req.body is empty!`,
            });
        }
    })
        .catch((err) => {
        res.status(500);
        res.send({
            message: err.message || "Error updating Car with id=" + id,
        });
    });
});
// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Car.destroy({
        where: { id: id },
    })
        .then((num) => {
        if (num == 1) {
            res.send({
                message: "Car was deleted successfully!",
            });
        }
        else {
            res.send({
                message: `Cannot delete Car with id=${id}. Maybe Car was not found!`,
            });
        }
    })
        .catch((err) => {
        res.status(500);
        res.send({
            message: err.message || "Could not delete Car with id=" + id,
        });
    });
};
// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield Car.destroy({
        where: {},
        truncate: false,
    })
        .then((nums) => {
        res.send({ message: `${nums} Cars were deleted successfully!` });
    })
        .catch((err) => {
        res.status(500);
        res.send({
            message: err.message || "Some error occurred while removing all cars.",
        });
    });
});
exports.haveCar = (license_code, city) => __awaiter(void 0, void 0, void 0, function* () {
    var condition = {
        license_code: license_code,
        city: city,
    };
    const result = yield Car.findAll({ where: condition });
    if (result === null) {
        console.log("Not found!");
        return [];
    }
    else {
        return result;
    }
});
exports.fncreate = (license_code, city, car_size_id) => __awaiter(void 0, void 0, void 0, function* () {
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
    const chk = yield Car.findAll({ where: condition });
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
    const result = yield Car.create(car);
    if (result === null) {
        console.log("Not found!");
        return [];
    }
    else {
        return result;
    }
});
