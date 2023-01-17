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
const Shop = db.shops;
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
    // Create a Tutorial
    const shop = {
        name: req.body.name,
        logo: req.body.logo,
        tel: req.body.tel,
        line: req.body.line,
        address: req.body.address,
    };
    // Save Tutorial in the database
    yield Shop.create(shop)
        .then((data) => {
        res.send(data);
    })
        .catch((err) => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Shop.",
        });
    });
});
// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name
        ? { name: { [Op.like]: `%${name}%` } }
        : null;
    Shop.findAll({ where: condition })
        .then((data) => {
        res.send(data);
    })
        .catch((err) => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving shops.",
        });
    });
};
// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Shop.findByPk(id)
        .then((data) => {
        if (data) {
            res.send(data);
        }
        else {
            res.status(404).send({
                message: `Cannot find Shop with id=${id}.`,
            });
        }
    })
        .catch((err) => {
        res.status(500).send({
            message: err.message || "Error retrieving Shop with id=" + id,
        });
    });
};
// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    Shop.update(req.body, {
        where: { id: id },
    })
        .then((num) => {
        if (num == 1) {
            res.send({
                message: "Shop was updated successfully.",
            });
        }
        else {
            res.send({
                message: `Cannot update Shop with id=${id}. Maybe Shop was not found or req.body is empty!`,
            });
        }
    })
        .catch((err) => {
        res.status(500).send({
            message: err.message || "Error updating Shop with id=" + id,
        });
    });
};
// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Shop.destroy({
        where: { id: id },
    })
        .then((num) => {
        if (num == 1) {
            res.send({
                message: "Shop was deleted successfully!",
            });
        }
        else {
            res.send({
                message: `Cannot delete Shop with id=${id}. Maybe Shop was not found!`,
            });
        }
    })
        .catch((err) => {
        res.status(500).send({
            message: err.message || "Could not delete Shop with id=" + id,
        });
    });
};
// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    Shop.destroy({
        where: {},
        truncate: false,
    })
        .then((nums) => {
        res.send({ message: `${nums} Shops were deleted successfully!` });
    })
        .catch((err) => {
        res.status(500).send({
            message: err.message || "Some error occurred while removing all shops.",
        });
    });
};
exports.haveCar = (name) => __awaiter(void 0, void 0, void 0, function* () {
    var condition = {
        name: name,
    };
    const result = yield Shop.findAll({ where: condition });
    if (result === null) {
        console.log("Not found!");
        return [];
    }
    else {
        return result;
    }
});
exports.fncreate = (name, logo, tel, line, address) => __awaiter(void 0, void 0, void 0, function* () {
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
    const result = yield Shop.create(shop);
    if (result === null) {
        console.log("Not found!");
        return [];
    }
    else {
        return result;
    }
});
