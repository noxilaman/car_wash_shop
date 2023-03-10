"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
const groups = require("../../controllers/group.controller");
var router = express.Router();
router.get("/getall", groups.findAll);
router.post("/", groups.create);
router.get("/", groups.findAll);
router.get("/:id", groups.findOne);
router.put("/:id", groups.update);
router.delete("/:id", groups.delete);
module.exports = router;
