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
        while (_) try {
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
var db = require("../models");
var Car = db.cars;
var Op = db.Sequelize.Op;
// Create and Save a new Tutorial
exports.create = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var condition, result, car;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // Validate request
                if (!req.body.license_code) {
                    res.status(400).send({
                        message: "license_code can not be empty!"
                    });
                    return [2 /*return*/];
                }
                if (!req.body.city) {
                    res.status(400).send({
                        message: "city can not be empty!"
                    });
                    return [2 /*return*/];
                }
                if (!req.body.car_size_id) {
                    res.status(400).send({
                        message: "Car size can not be empty!"
                    });
                    return [2 /*return*/];
                }
                condition = {
                    license_code: req.body.license_code,
                    city: req.body.city,
                    car_size_id: req.body.car_size_id
                };
                return [4 /*yield*/, Car.findAll({ where: condition })];
            case 1:
                result = _a.sent();
                if (result.length > 0) {
                    res.status(400).send({
                        message: "Already have prices!"
                    });
                    return [2 /*return*/];
                }
                car = {
                    license_code: req.body.license_code,
                    city: req.body.city,
                    car_size_id: req.body.car_size_id,
                    note: req.body.note
                };
                // Save Tutorial in the database
                return [4 /*yield*/, Car.create(car)
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
    var license_code = req.query.license_code;
    var condition = license_code
        ? { license_code: (_a = {}, _a[Op.like] = "%".concat(license_code, "%"), _a) }
        : null;
    Car.findAll({ where: condition })
        .then(function (data) {
        res.send(data);
    })["catch"](function (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving cars."
        });
    });
};
// Find a single Tutorial with an id
exports.findOne = function (req, res) {
    var id = req.params.id;
    Car.findByPk(id)
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
            message: err.message || "Error retrieving Car with id=" + id
        });
    });
};
// Update a Tutorial by the id in the request
exports.update = function (req, res) {
    var id = req.params.id;
    Car.update(req.body, {
        where: { id: id }
    })
        .then(function (num) {
        if (num == 1) {
            res.send({
                message: "Car was updated successfully."
            });
        }
        else {
            res.send({
                message: "Cannot update Car with id=".concat(id, ". Maybe Car was not found or req.body is empty!")
            });
        }
    })["catch"](function (err) {
        res.status(500).send({
            message: err.message || "Error updating Car with id=" + id
        });
    });
};
// Delete a Tutorial with the specified id in the request
exports["delete"] = function (req, res) {
    var id = req.params.id;
    Car.destroy({
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
    Car.destroy({
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
exports.haveCar = function (license_code, city) { return __awaiter(_this, void 0, void 0, function () {
    var condition, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                condition = {
                    license_code: license_code,
                    city: city
                };
                return [4 /*yield*/, Car.findAll({ where: condition })];
            case 1:
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
exports.fncreate = function (license_code, city, car_size_id) { return __awaiter(_this, void 0, void 0, function () {
    var condition, chk, car, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // Validate request
                if (!license_code) {
                    return [2 /*return*/];
                }
                if (!city) {
                    return [2 /*return*/];
                }
                if (!car_size_id) {
                    return [2 /*return*/];
                }
                condition = {
                    license_code: license_code,
                    city: city,
                    car_size_id: car_size_id
                };
                return [4 /*yield*/, Car.findAll({ where: condition })];
            case 1:
                chk = _a.sent();
                if (chk.length > 0) {
                    return [2 /*return*/];
                }
                car = {
                    license_code: license_code,
                    city: city,
                    car_size_id: car_size_id,
                    note: ''
                };
                return [4 /*yield*/, Car.create(car)];
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
