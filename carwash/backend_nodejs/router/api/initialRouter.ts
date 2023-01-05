var express = require("express");
const carsizes = require("../../controllers/car_size.controller");
const washtypes = require("../../controllers/wash_type.controller");
const prices = require("../../controllers/price.controller");
const users = require("../../controllers/user.controller");
const shops = require("../../controllers/shop.controller");
var router = express.Router();

  router.get("/", (req: any, res: any) => {
  var sizecarbase = ["S", "M", "L", "XL"];

  var washtypebase = [
    "ล้างสี",
    "ดูดฝุ่น",
    "ล้างสี + ดูดฝุ่น",
    "ล้างสี + ดูดฝุ่น + ขัดเครือบ",
  ];

  var pricelists = [
    ["ล้างสี", "S", "80"],
    ["ล้างสี", "M", "100"],
    ["ล้างสี", "L", "120"],
    ["ล้างสี", "XL", "150"],
    ["ดูดฝุ่น", "S", "50"],
    ["ดูดฝุ่น", "M", "80"],
    ["ดูดฝุ่น", "L", "100"],
    ["ดูดฝุ่น", "XL", "120"],
    ["ล้างสี + ดูดฝุ่น", "S", "120"],
    ["ล้างสี + ดูดฝุ่น", "M", "150"],
    ["ล้างสี + ดูดฝุ่น", "L", "180"],
    ["ล้างสี + ดูดฝุ่น", "XL", "200"],
    ["ล้างสี + ดูดฝุ่น + ขัดเครือบ", "S", "180"],
    ["ล้างสี + ดูดฝุ่น + ขัดเครือบ", "M", "220"],
    ["ล้างสี + ดูดฝุ่น + ขัดเครือบ", "L", "250"],
    ["ล้างสี + ดูดฝุ่น + ขัดเครือบ", "XL", "300"],
  ];

  const promise1 = new Promise((resolve, reject) => {
    sizecarbase.map(async (opt: any) => {
      try {
        const result = await carsizes.fncreate(opt, opt);
        resolve(result);
      } catch (error) {
        console.log(error);
      }
    });
  });

  const promise2 = new Promise((resolve, reject) => {
    washtypebase.map(async (opt) => {
      try {
        const result = await washtypes.fncreate(opt, opt);
        resolve(result);
      } catch (error) {
        console.log(error);
      }
    });
  });

  Promise.all([promise1, promise2])
    .then(() => {
      pricelists.map(async (opt) => {
        try {
          const carsize = await carsizes.findByName(opt[1]);
          const washtype = await washtypes.findByName(opt[0]);

          const result = await prices.fncreate(
            1,
            washtype[0].id,
            carsize[0].id,
            opt[2]
          );
        } catch (error: any) {
          console.log(error);
        }
      });
    })
    .finally(() => {
      res.send("end");
    });
});

router.get("/usersetup", async (req: any, res: any) => {
  try {
    const promise1 = new Promise(async (resolve, reject) => {

      const result = await shops.fncreate(
        "demo",
        "/uploads/logo/demo.png",
        "000000000",
        "noxil",
        "-"
      );
      resolve(result);
    });
    const promise2 = new Promise(async (resolve, reject) => {
      
      const result = await users.fncreate(
        "admin",
        "admin",
        "0000000000",
        "admin@admin.com",
        "password",
      );
      resolve(result);
    }); 

    Promise.all([promise1,promise2])
      .finally(() => {
        res.send("end");
      });
  } catch (error: any) {
    console.log(error);
  }
});

module.exports = router;
