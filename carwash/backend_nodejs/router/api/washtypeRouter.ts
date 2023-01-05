var express = require("express");
const washtypes = require("../../controllers/wash_type.controller")
var router = express.Router();

router.get("/getall", washtypes.findAll);

router.post("/", washtypes.create);

router.get("/", washtypes.findAll);

router.get("/:id", washtypes.findOne);

router.put("/:id", washtypes.update);

router.delete("/:id", washtypes.delete);

module.exports = router;
