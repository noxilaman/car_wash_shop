"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
const images = require("../../controllers/image.controller");
var router = express.Router();
router.get("/readiamge/:filename", images.getimage);
module.exports = router;
