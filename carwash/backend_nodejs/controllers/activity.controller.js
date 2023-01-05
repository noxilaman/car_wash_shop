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
var QueryTypes = require("sequelize").QueryTypes;
var Activity = db.activities;
var Op = db.Sequelize.Op;
// Create and Save a new Tutorial
exports.create = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var activity;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // Validate request
                if (!req.body.name) {
                    res.status(400).send({
                        message: "name can not be empty!"
                    });
                    return [2 /*return*/];
                }
                if (!req.body.desc) {
                    res.status(400).send({
                        message: "desc can not be empty!"
                    });
                    return [2 /*return*/];
                }
                activity = {
                    car_id: req.body.car_id,
                    wash_type_id: req.body.wash_type_id,
                    status: "Pending",
                    note: "",
                    price: req.body.price
                };
                // Save Tutorial in the database
                return [4 /*yield*/, Activity.create(activity)
                        .then(function (data) {
                        res.send(data);
                    })["catch"](function (err) {
                        res.status(500).send({
                            message: err.message || "Some error occurred while creating the Activity."
                        });
                    })];
            case 1:
                // Save Tutorial in the database
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
// Retrieve all Tutorials from the database.
exports.findAll = function (req, res) {
    var _a;
    var name = req.query.name;
    var condition = name ? { name: (_a = {}, _a[Op.like] = "%".concat(name, "%"), _a) } : null;
    Activity.findAll({ where: condition })
        .then(function (data) {
        res.send(data);
    })["catch"](function (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving activities."
        });
    });
};
// Find a single Tutorial with an id
exports.findOne = function (req, res) {
    var id = req.params.id;
    Activity.findByPk(id)
        .then(function (data) {
        if (data) {
            res.send(data);
        }
        else {
            res.status(404).send({
                message: "Cannot find Activity with id=".concat(id, ".")
            });
        }
    })["catch"](function (err) {
        res.status(500).send({
            message: "Error retrieving Activity with id=" + id
        });
    });
};
// Update a Tutorial by the id in the request
exports.update = function (req, res) {
    var id = req.params.id;
    Activity.update(req.body, {
        where: { id: id }
    })
        .then(function (num) {
        if (num == 1) {
            res.send({
                message: "Activity was updated successfully."
            });
        }
        else {
            res.send({
                message: "Cannot update Activity with id=".concat(id, ". Maybe Activity was not found or req.body is empty!")
            });
        }
    })["catch"](function (err) {
        res.status(500).send({
            message: "Error updating Activity with id=" + id
        });
    });
};
// Delete a Tutorial with the specified id in the request
exports["delete"] = function (req, res) {
    var id = req.params.id;
    Activity.destroy({
        where: { id: id }
    })
        .then(function (num) {
        if (num == 1) {
            res.send({
                message: "Activity was deleted successfully!"
            });
        }
        else {
            res.send({
                message: "Cannot delete Activity with id=".concat(id, ". Maybe Activity was not found!")
            });
        }
    })["catch"](function (err) {
        res.status(500).send({
            message: "Could not delete Activity with id=" + id
        });
    });
};
// Delete all Tutorials from the database.
exports.deleteAll = function (req, res) {
    Activity.destroy({
        where: {},
        truncate: false
    })
        .then(function (nums) {
        res.send({ message: "".concat(nums, " Activitys were deleted successfully!") });
    })["catch"](function (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while removing all activities."
        });
    });
};
exports.list = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Activity.seq.query("SELECT activities.id AS id ,activities.createdAt AS createdate,cars.license_code AS licensecode, cars.city AS licensecity,car_sizes.name AS carsize,wash_types.name AS washtype,activities.price AS price,activities.`status` AS washstatus FROM activities LEFT JOIN cars ON cars.id = activities.car_id LEFT JOIN car_sizes ON car_sizes.id = cars.car_size_id LEFT JOIN wash_types ON wash_types.id = activities.wash_type_id ORDER BY activities.createdAt desc limit 10;", {
                    type: QueryTypes.SELECT
                })];
            case 1:
                data = _a.sent();
                if (data) {
                    res.send(data);
                }
                else {
                    res.status(404).send({
                        message: "Cannot find Activity."
                    });
                }
                return [2 /*return*/];
        }
    });
}); };
exports.listByShop = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var shop_id, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                shop_id = req.params.shop_id;
                return [4 /*yield*/, Activity.seq.query("SELECT activities.id AS id ,activities.createdAt AS createdate,cars.license_code AS licensecode, cars.city AS licensecity,car_sizes.name AS carsize,wash_types.name AS washtype,activities.price AS price,activities.`status` AS washstatus FROM activities LEFT JOIN cars ON cars.id = activities.car_id LEFT JOIN car_sizes ON car_sizes.id = cars.car_size_id LEFT JOIN wash_types ON wash_types.id = activities.wash_type_id where activities.shop_id = :shop_id ORDER BY activities.createdAt desc limit 10;", {
                        replacements: { shop_id: shop_id },
                        type: QueryTypes.SELECT
                    })];
            case 1:
                data = _a.sent();
                if (data) {
                    res.send(data);
                }
                else {
                    res.status(404).send({
                        message: "Cannot find Activity."
                    });
                }
                return [2 /*return*/];
        }
    });
}); };
// Create and Save a new Tutorial
exports.fncreate = function (car_id, shop_id, wash_type_id, price) { return __awaiter(_this, void 0, void 0, function () {
    var activity, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // Validate request
                if (!car_id) {
                    return [2 /*return*/];
                }
                if (!shop_id) {
                    return [2 /*return*/];
                }
                if (!wash_type_id) {
                    return [2 /*return*/];
                }
                if (!price) {
                    return [2 /*return*/];
                }
                activity = {
                    car_id: car_id,
                    shop_id: shop_id,
                    wash_type_id: wash_type_id,
                    status: "Pending",
                    note: "",
                    price: price
                };
                return [4 /*yield*/, Activity.create(activity)];
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
exports.getcustom = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var id, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, Activity.seq.query("SELECT activities.id AS id ,activities.createdAt AS createdate,cars.license_code AS licensecode, cars.city AS licensecity,car_sizes.name AS carsize,wash_types.name AS washtype,activities.price AS price,activities.`status` AS washstatus FROM activities LEFT JOIN cars ON cars.id = activities.car_id LEFT JOIN car_sizes ON car_sizes.id = cars.car_size_id LEFT JOIN wash_types ON wash_types.id = activities.wash_type_id WHERE activities.id = :id  limit 1;", {
                        replacements: { id: id },
                        type: QueryTypes.SELECT
                    })];
            case 1:
                data = _a.sent();
                if (data) {
                    res.send(data);
                }
                else {
                    res.status(404).send({
                        message: "Cannot find Activity."
                    });
                }
                return [2 /*return*/];
        }
    });
}); };
// Update a Tutorial by the id in the request
exports.updateStatus = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var id, status_1, myactivity, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.body.id;
                status_1 = req.body.status;
                return [4 /*yield*/, Activity.findByPk(id)];
            case 1:
                myactivity = _a.sent();
                myactivity.status = status_1;
                myactivity.save();
                res.status(200).send('done');
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                res.status(404).send();
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
