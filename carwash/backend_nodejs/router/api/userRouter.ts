export {}
var express = require("express");
const users = require("../../controllers/user.controller");
var router = express.Router();

const auth = require("../../middleware/auth");

router.post("/login", users.login);

router.get("/list", auth, users.list);

router.post("/updategroup/:id", auth, users.update);

router.post("/", auth, users.create);

router.get("/", auth, users.findAll);

router.get("/:id", auth, users.findOne);

router.put("/:id", auth, users.update);

router.delete("/:id", auth, users.delete);

module.exports = router;

