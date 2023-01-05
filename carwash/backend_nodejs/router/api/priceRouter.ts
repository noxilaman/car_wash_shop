var express = require("express");
const prices = require("../../controllers/price.controller")
var router = express.Router();

router.get(
  "/getselected/:shop_id/:wash_type_id/:car_size_id",
  prices.getselected
);

router.get("/getall", prices.findAll);

router.get("/list", prices.list);

router.post("/", prices.create);

router.get("/", prices.findAll);

router.get("/:id", prices.findOne);

router.put("/:id", prices.update);

router.delete("/:id", prices.delete);

module.exports = router;
