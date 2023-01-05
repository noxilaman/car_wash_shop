var express = require("express");
const shops = require("../../controllers/shop.controller");
var router = express.Router();

router.post("/", shops.create);

router.get("/", shops.findAll);

router.get("/:id", shops.findOne);

router.put("/:id", shops.update);

router.delete("/:id", shops.delete);

module.exports = router;
