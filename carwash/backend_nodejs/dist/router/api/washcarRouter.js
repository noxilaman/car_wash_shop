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
var router = express.Router();
const cars = require("../../controllers/car.controller");
const activities = require("../../controllers/activity.controller");
router.post("/create", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const postData = req.body;
            //console.log(req.files);
            if (req.files) {
                const { File } = req.files;
                File.mv(__dirname + "/../../../frontend_reactjs/public/uploads/" + File.name);
            }
            //validate Empty data
            if (!(postData.licensename &&
                postData.city &&
                postData.sizeId &&
                postData.washTypeId &&
                postData.price)) {
                res.status(400).send("All Input is required");
            }
            const gResult = yield cars.haveCar(postData.licensename, postData.city);
            var carid;
            if (gResult.length === 0) {
                const Result = yield cars.fncreate(postData.licensename, postData.city, postData.sizeId);
                //console.log(Result);
                carid = Result.id;
            }
            else {
                //console.log(gResult[0].id);
                carid = gResult[0].id;
                // xports.fncreate = async(car_id, wash_type_id, price);
            }
            if (carid) {
                const Result = yield activities.fncreate(carid, postData.washTypeId, postData.price);
                res.status(200).send(Result);
            }
        }
        catch (error) {
            console.log(error);
        }
    });
});
module.exports = router;
