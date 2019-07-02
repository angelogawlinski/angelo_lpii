var express = require("express");
var router = express.Router();

var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get("/", function(request, response) {
  response.status(200).send({
    title: "Node Express API Top",
    version: "1.0.0"
  });
});

module.exports = app;
