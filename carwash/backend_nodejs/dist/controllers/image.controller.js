"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const nodecache = require('node-cache');
require('isomorphic-fetch');
const appCache = new nodecache({ stdTTL: 3599 });
// Retrieve all Tutorials from the database.
exports.getimage = (req, res) => {
    const filename = req.params.filename;
    const image = path.join(__dirname, "../uploads/images/" + filename);
    res.sendFile(image);
};
