"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (!token) {
        res.status(403);
        res.send("Empty token");
        return;
    }
    try {
        const decode = yield jwt.verify(token, process.env.JWT_TOKEN_KEY);
        //console.log(decode);
        req.user = decode;
    }
    catch (error) {
        console.log(error);
        res.status(404);
        res.send("Expired Key");
        return;
    }
    return next();
});
module.exports = verifyToken;
