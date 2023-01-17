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
require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
const db = require("../models");
const User = db.users;
const Group = db.groups;
const Op = db.Sequelize.Op;
const { QueryTypes } = require("sequelize");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// Create and Save a new Tutorial
exports.create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    var encyptedPassword = yield bcrypt.hash(req.body.password, 10);
    // Create a Tutorial
    const user = {
        fname: req.body.fname,
        lname: req.body.lname,
        mobile: req.body.mobile,
        email: req.body.email,
        password: encyptedPassword,
    };
    // Save Tutorial in the database
    yield User.create(user)
        .then((data) => {
        res.send(data);
    })
        .catch((err) => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Car.",
        });
    });
});
// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const fname = req.query.fname;
    var condition = fname ? { fname: { [Op.like]: `%${fname}%` } } : null;
    User.findAll({ where: condition })
        .then((data) => {
        res.send(data);
    })
        .catch((err) => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users.",
        });
    });
};
// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    User.findByPk(id)
        .then((data) => {
        if (data) {
            res.send(data);
        }
        else {
            res.status(404).send({
                message: `Cannot find Car with id=${id}.`,
            });
        }
    })
        .catch((err) => {
        res.status(500).send({
            message: err.message || "Error retrieving User with id=" + id,
        });
    });
};
// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    User.update(req.body, {
        where: { id: id },
    })
        .then((num) => {
        if (num == 1) {
            res.send({
                message: "User was updated successfully.",
            });
        }
        else {
            res.send({
                message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`,
            });
        }
    })
        .catch((err) => {
        res.status(500).send({
            message: err.message || "Error updating User with id=" + id,
        });
    });
};
// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    User.destroy({
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
        res.status(500).send({
            message: err.message || "Could not delete Car with id=" + id,
        });
    });
};
// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    User.destroy({
        where: {},
        truncate: false,
    })
        .then((nums) => {
        res.send({ message: `${nums} Cars were deleted successfully!` });
    })
        .catch((err) => {
        res.status(500).send({
            message: err.message || "Some error occurred while removing all cars.",
        });
    });
};
exports.fncreate = (fname, lname, mobile, email, password) => __awaiter(void 0, void 0, void 0, function* () {
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
    var encyptedPassword = yield bcrypt.hash(password, 10);
    // Create a Tutorial
    const user = {
        fname: fname,
        lname: lname,
        mobile: mobile,
        email: email,
        password: encyptedPassword,
    };
    // Save Tutorial in the database
    const result = yield User.create(user);
    if (result === null) {
        console.log("Not found!");
        return [];
    }
    else {
        return result;
    }
});
// Update a Tutorial by the id in the request
exports.gentoken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.body.id;
        const token = req.body.token;
        const myuser = yield User.findByPk(id);
        myuser.status = token;
        myuser.save();
        res.status(200).send("done");
    }
    catch (error) {
        res.status(404).send({ message: error.message });
    }
});
exports.login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const user = yield User.findOne({ where: { email: email } });
        const resultchk = yield bcrypt.compare(password, user.password);
        if (user && (yield bcrypt.compare(password, user.password))) {
            const group = yield Group.findOne({ where: { id: user.group_id } });
            const token = jwt.sign({ id: user.id, email, group_id: user.group_id, groupname: user.name }, process.env.JWT_TOKEN_KEY, { expiresIn: "2h" });
            user.token = token;
            console.log(user);
            yield user.save();
            return res.status(200).json(user);
        }
        return res.status(401).send({ message: "Login Fail" });
    }
    catch (error) {
        return res.status(401).send({ message: "Error", obj: error });
    }
});
exports.list = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield User.seq.query("SELECT users.id, users.fname, users.lname, users.email , users.mobile, groups.name as groupname FROM users LEFT JOIN groups ON groups.id = users.group_id", {
        type: QueryTypes.SELECT,
    });
    if (data) {
        res.send(data);
    }
    else {
        res.status(404).send({
            message: `Cannot find Users.`,
        });
    }
});
