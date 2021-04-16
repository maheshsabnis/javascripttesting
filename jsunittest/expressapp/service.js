// 1. load express Object Model
var express = require("express");
// 1a. load body-parser
var bodyParser = require("body-parser");

// 1c. define data
var emp = [{ EmpNo: 101, EmpName: "A" }, { EmpNo: 102, EmpName: "B" }];

// 2. create an instance of express
var instance = express();
// 2a. body-parser configuration for JSON and
// url based data
instance.use(bodyParser.json());
instance.use(bodyParser.urlencoded({ extended: false }));

// 3. adding services
instance.get("/", function (req, resp) {
  resp.send("Hello World");
});

instance.get("/emp", function (req, resp) {
  resp.send({ status: 200, data: emp });
  //resp.send(emp);
});
instance.post("/emp", function (req, resp) {
  var e = {
    EmpNo: req.body.EmpNo,
    EmpName: req.body.EmpName
  };
  if (e.EmpNo < 0 || e.EmpName == "") {
    resp.statusCode = 500;
    resp.send({
      status: resp.statusCode,
      data: "Either EmpNo is negative or EmpName is empty"
    }); // body
    //resp.header("statusCode", 500); // header
  } else {
    emp.push(e);
    resp.send({ status: 201, data: emp });
  }
});
// 4. start listening
instance.listen(7080, function () {
  console.log("started on port 7080");
});
