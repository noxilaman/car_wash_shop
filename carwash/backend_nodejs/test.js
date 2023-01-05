const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require("multer");
const washcarRouter = require("./router/api/washcarRouter");
const initialRouter = require("./router/api/initialRouter");
const sizecarRouter = require("./router/api/sizecarRouter");
const washtypeRouter = require("./router/api/washtypeRouter");
const priceRouter = require("./router/api/priceRouter");
const activitiesRouter = require("./router/api/activitiesRouter");
const carsRouter = require("./router/api/carsRouter");
const usersRouter = require("./router/api/userRouter");
const shopsRouter = require("./router/api/shopRouter");
const publicRouter = require("./router/api/publicRouter")
const auth = require("./middleware/auth");

const app = express();
const port = 8086;

app.use(cors());


const db = require("./models");
db.sequelize.sync()
  .then(() => {
    //console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });


// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileUpload());

app.use("/api/car", auth, carsRouter);
app.use("/api/washcar", auth, washcarRouter);
app.use("/api/initial", initialRouter);
app.use("/api/sizecar",auth, sizecarRouter);
app.use("/api/washtype", auth, washtypeRouter);
app.use("/api/activities",auth, activitiesRouter);
app.use("/api/price", auth, priceRouter);
app.use("/api/shop", auth, shopsRouter);
app.use("/api/user", usersRouter);
app.use("/api/public", publicRouter);

app.get('/api', (req, res) => {
    res.send('Hello World, from express');
});

app.get("/api/checkauth",auth,(req,res)=>{
  res.status(200).send("Auth Pass");
})
//For Test
module.exports = app;

//For Runing
//app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))
// app.listen(port);
