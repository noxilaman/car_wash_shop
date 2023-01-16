"use strict";
exports.__esModule = true;
var express = require("express");
var activities = require("../../controllers/activity.controller");
var router = express.Router();
router.get("/list", activities.list);
router.get("/get/:id", activities.getcustom);
router.post("/updatestatus", activities.updateStatus);
router.get("/listByShop", activities.listByShop);
router.get("/listByOperation", activities.listByOperation);
router.get("/listByCashier", activities.listByCashier);
module.exports = router;
