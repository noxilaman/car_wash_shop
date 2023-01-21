export {}
var express = require("express");
var router = express.Router();
const cars = require("../../controllers/car.controller");
const activities = require("../../controllers/activity.controller");

router.post("/create", async function (req : any, res: any) {
  try {
    const postData = req.body;


    //validate Empty data
    if (
      !(
        postData.licensename &&
        postData.city &&
        postData.sizeId &&
        postData.washTypeId &&
        postData.price
      )
    ) {
      res.status(400).send("All Input is required");
    }
    postData.photo = "";
    //console.log(req.files);
    if (req.files) {
      const { File } = req.files;

      File.mv(
        __dirname + "/../../../frontend_reactjs/public/uploads/" + File.name
      );
      postData.photo = "/uploads/" + File.name;
    }

    const gResult = await cars.haveCar(postData.licensename, postData.city);

    var carid;
    if (gResult.length === 0) {
      const Result = await cars.fncreate(
        postData.licensename,
        postData.city,
        postData.sizeId
      );
      //console.log(Result);
      carid = Result.id;
    } else {
      //console.log(gResult[0].id);
      carid = gResult[0].id;
      // xports.fncreate = async(car_id, wash_type_id, price);
    }

    if (carid) {
      const Result = await activities.fncreate(
        carid,
        postData.washTypeId,
        postData.price,
        postData.photo
      );
      res.status(200).send(Result);
    }
  } catch (error: any) {
    console.log(error);
  }
});
module.exports = router;
