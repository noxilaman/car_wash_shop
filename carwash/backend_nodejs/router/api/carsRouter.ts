var express = require("express");
const cars = require("../../controllers/car.controller");
var router = express.Router();

router.post("/", cars.create);

router.get("/", cars.findAll);

router.get("/:id", cars.findOne);

router.put("/:id", cars.update);

router.delete("/:id", cars.delete);

module.exports = router;
