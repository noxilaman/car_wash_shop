var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
require("dotenv").config({ path: ".env.".concat(process.env.NODE_ENV) });
var db = require("../models");
var User = db.users;
var Op = db.Sequelize.Op;
var QueryTypes = require("sequelize").QueryTypes;
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
// Create and Save a new Tutorial
exports.create = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var encyptedPassword, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // Validate request
                if (!req.body.fname) {
                    res.status(400).send({
                        message: "license_code can not be empty!"
                    });
                    return [2 /*return*/];
                }
                if (!req.body.lname) {
                    res.status(400).send({
                        message: "city can not be empty!"
                    });
                    return [2 /*return*/];
                }
                if (!req.body.mobile) {
                    res.status(400).send({
                        message: "Car size can not be empty!"
                    });
                    return [2 /*return*/];
                }
                if (!req.body.email) {
                    res.status(400).send({
                        message: "Car size can not be empty!"
                    });
                    return [2 /*return*/];
                }
                if (!req.body.password) {
                    res.status(400).send({
                        message: "Car size can not be empty!"
                    });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, bcrypt.hash(req.body.password, 10)];
            case 1:
                encyptedPassword = _a.sent();
                user = {
                    fname: req.body.fname,
                    lname: req.body.lname,
                    mobile: req.body.mobile,
                    email: req.body.email,
                    password: encyptedPassword
                };
                // Save Tutorial in the database
                return [4 /*yield*/, User.create(user)
                        .then(function (data) {
                        res.send(data);
                    })["catch"](function (err) {
                        res.status(500).send({
                            message: err.message || "Some error occurred while creating the Car."
                        });
                    })];
            case 2:
                // Save Tutorial in the database
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
// Retrieve all Tutorials from the database.
exports.findAll = function (req, res) {
    var _a;
    var fname = req.query.fname;
    var condition = fname ? { fname: (_a = {}, _a[Op.like] = "%".concat(fname, "%"), _a) } : null;
    User.findAll({ where: condition })
        .then(function (data) {
        res.send(data);
    })["catch"](function (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    });
};
// Find a single Tutorial with an id
exports.findOne = function (req, res) {
    var id = req.params.id;
    User.findByPk(id)
        .then(function (data) {
        if (data) {
            res.send(data);
        }
        else {
            res.status(404).send({
                message: "Cannot find Car with id=".concat(id, ".")
            });
        }
    })["catch"](function (err) {
        res.status(500).send({
            message: err.message || "Error retrieving User with id=" + id
        });
    });
};
// Update a Tutorial by the id in the request
exports.update = function (req, res) {
    var id = req.params.id;
    User.update(req.body, {
        where: { id: id }
    })
        .then(function (num) {
        if (num == 1) {
            res.send({
                message: "User was updated successfully."
            });
        }
        else {
            res.send({
                message: "Cannot update User with id=".concat(id, ". Maybe User was not found or req.body is empty!")
            });
        }
    })["catch"](function (err) {
        res.status(500).send({
            message: err.message || "Error updating User with id=" + id
        });
    });
};
// Delete a Tutorial with the specified id in the request
exports["delete"] = function (req, res) {
    var id = req.params.id;
    User.destroy({
        where: { id: id }
    })
        .then(function (num) {
        if (num == 1) {
            res.send({
                message: "Car was deleted successfully!"
            });
        }
        else {
            res.send({
                message: "Cannot delete Car with id=".concat(id, ". Maybe Car was not found!")
            });
        }
    })["catch"](function (err) {
        res.status(500).send({
            message: err.message || "Could not delete Car with id=" + id
        });
    });
};
// Delete all Tutorials from the database.
exports.deleteAll = function (req, res) {
    User.destroy({
        where: {},
        truncate: false
    })
        .then(function (nums) {
        res.send({ message: "".concat(nums, " Cars were deleted successfully!") });
    })["catch"](function (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while removing all cars."
        });
    });
};
exports.fncreate = function (fname, lname, mobile, email, password) { return __awaiter(_this, void 0, void 0, function () {
    var encyptedPassword, user, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // Validate request
                if (!fname) {
                    return [2 /*return*/];
                }
                if (!lname) {
                    return [2 /*return*/];
                }
                if (!mobile) {
                    return [2 /*return*/];
                }
                if (!email) {
                    return [2 /*return*/];
                }
                if (!password) {
                    return [2 /*return*/];
                }
                return [4 /*yield*/, bcrypt.hash(password, 10)];
            case 1:
                encyptedPassword = _a.sent();
                user = {
                    fname: fname,
                    lname: lname,
                    mobile: mobile,
                    email: email,
                    password: encyptedPassword
                };
                return [4 /*yield*/, User.create(user)];
            case 2:
                result = _a.sent();
                if (result === null) {
                    console.log("Not found!");
                    return [2 /*return*/, []];
                }
                else {
                    return [2 /*return*/, result];
                }
                return [2 /*return*/];
        }
    });
}); };
// Update a Tutorial by the id in the request
exports.gentoken = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var id, token, myuser, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.body.id;
                token = req.body.token;
                return [4 /*yield*/, User.findByPk(id)];
            case 1:
                myuser = _a.sent();
                myuser.status = token;
                myuser.save();
                res.status(200).send("done");
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                res.status(404).send({ message: error_1.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.login = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var _a, email, password, user, resultchk, _b, token, error_2;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 7, , 8]);
                _a = req.body, email = _a.email, password = _a.password;
                // Validate request
                if (!email) {
                    res.status(400).send({
                        message: "Email can not be empty!"
                    });
                    return [2 /*return*/];
                }
                if (!password) {
                    res.status(400).send({
                        message: "Password can not be empty!"
                    });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, User.findOne({ where: { email: email } })];
            case 1:
                user = _c.sent();
                return [4 /*yield*/, bcrypt.compare(password, user.password)];
            case 2:
                resultchk = _c.sent();
                _b = user;
                if (!_b) return [3 /*break*/, 4];
                return [4 /*yield*/, bcrypt.compare(password, user.password)];
            case 3:
                _b = (_c.sent());
                _c.label = 4;
            case 4:
                if (!_b) return [3 /*break*/, 6];
                token = jwt.sign({ id: user.id, email: email }, process.env.JWT_TOKEN_KEY, { expiresIn: "2h" });
                user.token = token;
                return [4 /*yield*/, user.save()];
            case 5:
                _c.sent();
                return [2 /*return*/, res.status(200).json(user)];
            case 6: return [2 /*return*/, res.status(401).send({ message: "Login Fail" })];
            case 7:
                error_2 = _c.sent();
                return [2 /*return*/, res.status(401).send({ message: "Error", obj: error_2 })];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.list = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, User.seq.query("SELECT users.id, users.fname, users.lname, users.email , users.mobile, groups.name as groupname FROM users LEFT JOIN groups ON groups.id = users.group_id", {
                    type: QueryTypes.SELECT
                })];
            case 1:
                data = _a.sent();
                if (data) {
                    res.send(data);
                }
                else {
                    res.status(404).send({
                        message: "Cannot find Users."
                    });
                }
                return [2 /*return*/];
        }
    });
}); };
