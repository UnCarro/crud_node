// Importación de módulos;
const express = require("express");
const bodyParser = require("body-parser");
const { Sequelize, Model, DataTypes } = require("sequelize");
// Asignación de módulos;
const app = express();
const sequelize = new Sequelize("sqlite::memory");
/* Construcción de módelo de datos para MySQL; */
class peon extends Model {}

//
app.use(bodyParser.urlencoded({ extended: true }));

/* get y post*/

app.get("/", function (req, res) {
  res.send("funciona");
});

/* Levantar el serverrr */
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("server up at: " + port);
});
