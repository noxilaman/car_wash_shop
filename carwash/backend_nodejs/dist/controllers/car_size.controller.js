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
const CarSize = db.car_sizes;
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
    var condition = {
        name: req.body.name
    };
    const result = yield CarSize.findAll({ where: condition });
    if (result.length > 0) {
        res.status(401).send({
            message: "Already have prices!",
        });
        return;
    }
    // Create a Tutorial
    const carsize = {
        name: req.body.name,
        desc: req.body.desc,
    };
    // Save Tutorial in the database
    yield CarSize.create(carsize)
        .then((data) => {
        res.send(data);
    })
        .catch((err) => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Car Size.",
        });
    });
});
// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
    CarSize.findAll({ where: condition })
        .then((data) => {
        res.send(data);
    })
        .catch((err) => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving car_sizes.",
        });
    });
};
// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    CarSize.findByPk(id)
        .then((data) => {
        if (data) {
            res.send(data);
        }
        else {
            res.status(404).send({
                message: `Cannot find Car Size with id=${id}.`,
            });
        }
    })
        .catch((err) => {
        res.status(500).send({
            message: err.message || "Error retrieving Car Size with id=" + id,
        });
    });
};
// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    CarSize.update(req.body, {
        where: { id: id },
    })
        .then((num) => {
        if (num == 1) {
            res.send({
                message: "Car Size was updated successfully.",
            });
        }
        else {
            res.send({
                message: `Cannot update Car Size with id=${id}. Maybe Car Size was not found or req.body is empty!`,
            });
        }
    })
        .catch((err) => {
        res.status(500).send({
            message: err.message || "Error updating Car Size with id=" + id,
        });
    });
};
// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    CarSize.destroy({
        where: { id: id },
    })
        .then((num) => {
        if (num == 1) {
            res.send({
                message: "Car Size was deleted successfully!",
            });
        }
        else {
            res.send({
                message: `Cannot delete Car Size with id=${id}. Maybe Car Size was not found!`,
            });
        }
    })
        .catch((err) => {
        res.status(500).send({
            message: err.message || "Could not delete Car Size with id=" + id,
        });
    });
};
// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    CarSize.destroy({
        where: {},
        truncate: false,
    })
        .then((nums) => {
        res.send({ message: `${nums} Car Sizes were deleted successfully!` });
    })
        .catch((err) => {
        res.status(500).send({
            message: err.message || "Some error occurred while removing all car_sizes.",
        });
    });
};
exports.fncreate = (name, desc) => __awaiter(void 0, void 0, void 0, function* () {
    // Validate request
    // Validate request
    if (!name) {
        return;
    }
    if (!desc) {
        return;
    }
    var condition = {
        name: name
    };
    const chk = yield CarSize.findAll({ where: condition });
    if (chk.length > 0) {
        chk.status(401).send({
            message: "Already have prices!",
        });
        return;
    }
    // Create a Tutorial
    const carsize = {
        name: name,
        desc: desc,
    };
    // Save Tutorial in the database
    const result = yield CarSize.create(carsize);
    if (result === null) {
        console.log("Not found!");
        return [];
    }
    else {
        return result;
    }
});
exports.findByName = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield CarSize.findAll({ where: { name: name } });
    return result;
});
