// Importación de módulos;
const express = require("express");
const bodyParser = require("body-parser");
const { Sequelize, Model, DataTypes } = require("sequelize");
// Asignación de módulos;
const app = express();
//app.use(bodyParser.urlencoded({ extended: true }));
const sequelize = new Sequelize("alfil", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

// Verificación;
sequelize
  .authenticate()
  .then(function () {
    console.log("success");
  })
  .catch(function (error) {
    console.log("error: " + error);
  });

/* Construcción de módelo de datos para MySQL; */
class Image extends Model {}
Image.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    name: { type: DataTypes.STRING },
    comentario: { type: DataTypes.STRING },
    url: { type: DataTypes.STRING },
  },
  { sequelize, modelName: "image" }
);

//Image.create({ id: 1, name: "Prueba", comentario: "Sisis", url: "asfahsvf" });

/* get y post */

app.get("/", function (req, res) {
  console.log(req);
  res.send("funciona");
});

/* Levantar el serverrr */
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("server up at: " + port);
});
