export {}
var express = require("express");
const images = require("../../controllers/image.controller")


var router = express.Router();

router.get("/readiamge/:filename", images.getimage);

module.exports = router;