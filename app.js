//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/failure", function(req,res){
  res.redirect("/");
});

app.post("/", function(req, res) {
      var firstName = req.body.first;
      var lastName = req.body.last;
      var email = req.body.email;

      var data = {
        members: [{
          email_address: email,
          status: "subscribed",
          merge_fields: {
            FNAME: firstName,
            LNAME: lastName
          }
        }]
      }

      var jsonData = JSON.stringify(data);

      var options = {
        url: "https://us4.api.mailchimp.com/3.0/lists/d11a1f51f3",
        method: "POST",
        headers: {
          "Authorization": "bond b87cf005af7c5c130e2d79593a62e48f-us4"
        },
        body: jsonData
      }

      request(options, function(error, response, body) {
          if (error) {
            // console.log(error);
            // alert("Error code is "+error);
            //res.send("There was an error with singing up. Please try again!");
            res.sendFile(__dirname + "/failure.html");
          } else {
            // console.log(response.statusCode);
            // alert("Success!");
            if (response.statusCode === 200) {
              //res.send("Successfully Subscribed!");
              res.sendFile(__dirname + "/success.html");
            } else {
              //res.send("There was an error with signing up. Please try again!");
              res.sendFile(__dirname + "/failure.html");
              }
            }
          });


        console.log("First Name =" + firstName); console.log("Last Name =" + lastName); console.log("Email =" + email);

      });


    app.listen(3000, function() {
      console.log("Server is running on port 3000.");
    });
