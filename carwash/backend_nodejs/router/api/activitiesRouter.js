var express = require("express");
var activities = require("../../controllers/activity.controller");
var router = express.Router();
router.get("/list", activities.list);
router.get("/get/:id", activities.getcustom);
router.post("/updatestatus", activities.updateStatus);
router.get("/listByShop/:shop_id", activities.listByShop);
module.exports = router;
