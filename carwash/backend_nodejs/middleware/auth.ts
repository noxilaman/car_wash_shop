require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const verifyToken = async (req: any,res: any,next: any) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    if(!token){
        res.status(403);
        res.send("Empty token");
        return;
    }

    try {
        const decode = await jwt.verify(token, process.env.JWT_TOKEN_KEY);
         //console.log(decode);
        req.user = decode;
    } catch (error) {
        console.log(error)
        res.status(404);
        res.send("Expired Key");
        return;
    }

    return next();
}

module.exports = verifyToken;