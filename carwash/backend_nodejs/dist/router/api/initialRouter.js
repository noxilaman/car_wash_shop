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
var express = require("express");
const carsizes = require("../../controllers/car_size.controller");
const washtypes = require("../../controllers/wash_type.controller");
const prices = require("../../controllers/price.controller");
const users = require("../../controllers/user.controller");
const groups = require("../../controllers/group.controller");
var router = express.Router();
router.get("/", (req, res) => {
    var sizecarbase = ["S", "M", "L", "XL"];
    var washtypebase = [
        "ล้างสี",
        "ดูดฝุ่น",
        "ล้างสี + ดูดฝุ่น",
        "ล้างสี + ดูดฝุ่น + ขัดเครือบ",
    ];
    var pricelists = [
        ["ล้างสี", "S", "80"],
        ["ล้างสี", "M", "100"],
        ["ล้างสี", "L", "120"],
        ["ล้างสี", "XL", "150"],
        ["ดูดฝุ่น", "S", "50"],
        ["ดูดฝุ่น", "M", "80"],
        ["ดูดฝุ่น", "L", "100"],
        ["ดูดฝุ่น", "XL", "120"],
        ["ล้างสี + ดูดฝุ่น", "S", "120"],
        ["ล้างสี + ดูดฝุ่น", "M", "150"],
        ["ล้างสี + ดูดฝุ่น", "L", "180"],
        ["ล้างสี + ดูดฝุ่น", "XL", "200"],
        ["ล้างสี + ดูดฝุ่น + ขัดเครือบ", "S", "180"],
        ["ล้างสี + ดูดฝุ่น + ขัดเครือบ", "M", "220"],
        ["ล้างสี + ดูดฝุ่น + ขัดเครือบ", "L", "250"],
        ["ล้างสี + ดูดฝุ่น + ขัดเครือบ", "XL", "300"],
    ];
    var grouplists = [
        ["Admin", "Admin"],
        ["Reception", "Reception"],
        ["Washman", "Washman"],
        ["Cashier", "Cashier"],
    ];
    const promise0 = new Promise((resolve, reject) => {
        grouplists.map((opt) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const result = yield groups.fncreate(opt, opt);
                resolve(result);
            }
            catch (error) {
                console.log(error);
            }
        }));
    });
    const promise1 = new Promise((resolve, reject) => {
        sizecarbase.map((opt) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const result = yield carsizes.fncreate(opt, opt);
                resolve(result);
            }
            catch (error) {
                console.log(error);
            }
        }));
    });
    const promise2 = new Promise((resolve, reject) => {
        washtypebase.map((opt) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const result = yield washtypes.fncreate(opt, opt);
                resolve(result);
            }
            catch (error) {
                console.log(error);
            }
        }));
    });
    Promise.all([promise1, promise2])
        .then(() => {
        pricelists.map((opt) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const carsize = yield carsizes.findByName(opt[1]);
                const washtype = yield washtypes.findByName(opt[0]);
                const result = yield prices.fncreate(washtype[0].id, carsize[0].id, opt[2]);
            }
            catch (error) {
                console.log(error);
            }
        }));
    })
        .finally(() => {
        res.send("end");
    });
});
router.get("/usersetup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const promise2 = new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield users.fncreate("admin", "admin", "0000000000", "admin@admin.com", "password");
            resolve(result);
        }));
        Promise.all([promise2])
            .finally(() => {
            res.send("end");
        });
    }
    catch (error) {
        console.log(error);
    }
}));
module.exports = router;
