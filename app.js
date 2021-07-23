// Importación de módulos;
const express = require("express");
const bodyParser = require("body-parser");
const { Sequelize, Model, DataTypes } = require("sequelize");

// Asignación de módulos;
const app = express();
//app.use(bodyParser.urlencoded({ extended: true }));

// configuración de la base de datos;
const sequelize = new Sequelize("alfil", "root", "", {
  host: "127.0.0.1",
  dialect: "mysql",
});

// Verificación;
/*
sequelize
  .authenticate()
  .then(function () {
    console.log("success");
  })
  .catch(function (error) {
    console.log("error: " + error);
  });
*/
// Construcción de modelo de datos para MySQL;

class Image extends Model {}
Image.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    name: { type: DataTypes.STRING },
    comentario: { type: DataTypes.STRING },
    url: { type: DataTypes.STRING },
  },
  { sequelize, modelName: "image", tableName: "images" }
);

// Image.sync({ force: true });

// métodos para las llamadas CRUD

function createImage(imageId, imageName, imageComment, imageUrl) {
  Image.create({
    id: imageId,
    name: imageName,
    comentario: imageComment,
    url: imageUrl,
  });
}

function deleteImage(imageId) {
  Image.destroy({ where: { id: imageId } });
}

function updateImage(imageId, newName, newComentario) {
  Image.update(
    { name: newName, comentario: newComentario },
    {
      where: {
        id: imageId,
      },
    }
  );
}

//updateImage(1, "Coneja", "Hola");

/* enrutadores */

app.get("/", function (req, res) {
  res.send("funciona");
});

app.post("/", function (req, res) {});

/* Levantar el serverrr */

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("server up at: " + port);
});
