const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.send("HOLA");
});

app.listen(port, function () {
  console.log("server up at: " + port);
});
