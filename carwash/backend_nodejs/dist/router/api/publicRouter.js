"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
const activities = require("../../controllers/activity.controller");
var router = express.Router();
router.get("/activity/get/:id", activities.getcustom);
module.exports = router;
