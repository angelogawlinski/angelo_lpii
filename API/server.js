var express = require("express");
var bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var index = require("./routes/index");
var produto = require("./routes/produto");
var categoria = require("./routes/categoria");

app.use("/", index);
app.use("/produto", produto);
app.use("/categoria", categoria);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.listen(3000, function() {
  console.log("Servidor rodando! Acesse: http://localhost:3000");
});
