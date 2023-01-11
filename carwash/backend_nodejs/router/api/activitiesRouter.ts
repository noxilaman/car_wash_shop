export {}
var express = require("express");
const activities = require("../../controllers/activity.controller")
var router = express.Router();

router.get("/list", activities.list);

router.get("/get/:id", activities.getcustom);

router.post("/updatestatus", activities.updateStatus);

router.get("/listByShop", activities.listByShop);

module.exports = router;
