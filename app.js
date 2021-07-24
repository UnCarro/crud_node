// Importación de módulos;
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const { Sequelize, Model, DataTypes } = require("sequelize");

// Asignación de módulos;
const app = express();
app.use(cors());

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpg", "image/jpeg", "image/png"];
  if (!allowedTypes.includes(file.mimetype)) {
    const error = new Error("Incorrect file extension");
    error.code = "INCORRECT_FILETYPE";
    return cb(error, false);
  }
  cb(null, true);
};
const upload = multer({
  dest: "./images",
  fileFilter,
});

app.use((err, req, res, next) => {
  if (err.code == "INCORRECT_FILETYPE") {
    res.status(422).json({ error: "Sólo se aceptan imágenes" });
    return;
  }
});

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

// métodos para las llamadas CRUD

function showAll() {
  Image.findAll({
    attributes: ["id"],
  });
}

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

function updateImage(imageId, newName, newComentario, newUrl) {
  Image.update(
    { name: newName, comentario: newComentario, url: newUrl },
    {
      where: {
        id: imageId,
      },
    }
  );
}

//Image.sync({ force: true });
//updateImage(2, "hedionda", "a vainilla", "https://esverdad.com");
//createImage(1, "daniel", "fullstack", "./images/hydra.jpg");
//deleteImage(3);
//showAll();

/* enrutadores */

app.get("/", function (req, res) {
  res.send("<h1>Funciona</h1>");
});

app.get("/delete", function (req, res) {});

app.post("/upload", upload.single("file"), (req, res) => {
  res.json({ file: req.file });
  console.log(res.json());

  /*let imageFile = req.files.file;
  imageFile.mv(`./images/${imageFile.name}`, (err) => {
    if (err) return res.status(500).send({ message: err });
    return res.status(200).send({ message: "File upload" });
  });*/
});

app.post("/update", function (req, res) {
  res.send("");
});
app.post("/", function (req, res) {
  /* req.body.data;
  req.body.effect(data);
*/
});

/* Levantar el serverrr */

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("server up at: " + port);
});
