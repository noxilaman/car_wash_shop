var express = require("express");
const carsizes = require("../../controllers/car_size.controller");
var router = express.Router();

const auth = require("../../middleware/auth");

router.get("/getall",  carsizes.findAll);

router.post("/", carsizes.create);

router.get("/",  carsizes.findAll);

router.get("/:id", carsizes.findOne);

router.put("/:id", carsizes.update);

router.delete("/:id",  carsizes.delete);

module.exports = router;
