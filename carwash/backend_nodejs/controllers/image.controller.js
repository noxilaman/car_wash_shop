"use strict";
exports.__esModule = true;
var path = require("path");
var nodecache = require('node-cache');
require('isomorphic-fetch');
var appCache = new nodecache({ stdTTL: 3599 });
// Retrieve all Tutorials from the database.
exports.getimage = function (req, res) {
    var filename = req.params.filename;
    var image = path.join(__dirname, "../uploads/images/" + filename);
    res.sendFile(image);
};
