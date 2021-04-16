// 1. load chai for arrange/act/assert
var expect = require("chai").expect;
// 2. load request object to make call to api
var request = require("request");
// 3. the test case

// it("should return Hello World when make a get call", function(done) {
//   request("http://localhost:7080", function(error, response, body) {
//     expect(body).to.equal("Hello World");
//     done();
//   });
// });
// the test data
var emp = [{ EmpNo: 101, EmpName: "A" }, { EmpNo: 102, EmpName: "B" }];

it("should return data when make a get call /emp is made", function (done) {
  request("http://localhost:7080/emp", function (error, response, body) {
    console.log(JSON.stringify(body));
    //expect(response.statusCode).to.equal(200);
    expect(JSON.stringify(JSON.parse(body).data)).to.equal(JSON.stringify(emp));
    done();
  });
});

it("should return 500 for error", function (done) {
  // arrange
  var data = { EmpNo: -1 };
  request(
    "http://localhost:7080/emp",
    { method: "POST", body: JSON.stringify(data) },
    function (error, response, body) {
      //expect(JSON.parse(body).status).to.equal(500);
      // if error code is responded through header
      // expect(response.statusCode).to.equal(500);
      // if error code is responded through body
      expect(JSON.parse(body).status).to.equal(500);
      done();
    }
  );
});
