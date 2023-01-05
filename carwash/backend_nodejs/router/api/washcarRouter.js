var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var express = require("express");
var router = express.Router();
var cars = require("../../controllers/car.controller");
var activities = require("../../controllers/activity.controller");
router.post("/create", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var postData, File_1, gResult, carid, Result, Result, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 7, , 8]);
                    postData = req.body;
                    //console.log(req.files);
                    if (req.files) {
                        File_1 = req.files.File;
                        File_1.mv(__dirname + "/../../../frontend_reactjs/public/uploads/" + File_1.name);
                    }
                    //validate Empty data
                    if (!(postData.shop_id &&
                        postData.licensename &&
                        postData.city &&
                        postData.sizeId &&
                        postData.washTypeId &&
                        postData.price)) {
                        res.status(400).send("All Input is required");
                    }
                    return [4 /*yield*/, cars.haveCar(postData.licensename, postData.city)];
                case 1:
                    gResult = _a.sent();
                    if (!(gResult.length === 0)) return [3 /*break*/, 3];
                    return [4 /*yield*/, cars.fncreate(postData.licensename, postData.city, postData.sizeId)];
                case 2:
                    Result = _a.sent();
                    //console.log(Result);
                    carid = Result.id;
                    return [3 /*break*/, 4];
                case 3:
                    //console.log(gResult[0].id);
                    carid = gResult[0].id;
                    _a.label = 4;
                case 4:
                    if (!carid) return [3 /*break*/, 6];
                    return [4 /*yield*/, activities.fncreate(carid, postData.shop_id, postData.washTypeId, postData.price)];
                case 5:
                    Result = _a.sent();
                    res.status(200).send(Result);
                    _a.label = 6;
                case 6: return [3 /*break*/, 8];
                case 7:
                    error_1 = _a.sent();
                    console.log(error_1);
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    });
});
module.exports = router;
