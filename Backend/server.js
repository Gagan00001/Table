var express = require("express");
var app = express();
var mongoose = require("mongoose");
var db = require("./schema");
var cors = require("cors");
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
mongoose.connect("mongodb://localhost:27017/Table", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(cors());

app.get("/fetch", async (req, res) => {
  startRow = req.query.startRow;
  endRow = req.query.endRow;
  console.log(">>>", startRow);
  console.log(">>>>", endRow);

  // db.find({})
  //   .then((allData) =>
  //     db.find({}, null, { limit: Number(endRow), skip: Number(startRow) })
  //   )
  //   .then((result) => {
  //     console.log(result);
  //   })
  //   .catch(() => {});

  try {
    const count = await db.find({}).count();
    console.log("count", count);
    const result = await db.find({}, null, {
      limit: Number(endRow),
      skip: Number(startRow),
    });
    console.log("result", result);
    res.send({count,result});
  } catch (error) {}
});

app.get("/search", (req, res) => {
  var name = req.body.name;
  db.find({}, function (err, result) {
    if (result[0] > 0) {
      res.send({
        Name: result[0].Name,
        Email: result[0].Email,
        Age: result[0].Age,
        Zipcode: result[0].Zipcode,
        Mob: result[0].contactInfo.Mob,
        Address: result[0].contactInfo.Address,
      });
    } else {
      res.send("No Data Found");
    }
  });
});

app.post("/save", (req, res) => {
  console.log("data-From Front-End", req.body);
  db.create(req.body, function (err, result) {
    res.send(result);
  });
  // res.send("data Saved Successfully")
});

app.listen(8081, () => {
  console.log("Running..........");
});
