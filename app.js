// Importación de módulos;
const express = require("express");
const multer = require("multer");
const fs = require("fs");
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
    name: { type: DataTypes.STRING },
    comentario: { type: DataTypes.STRING },
    url: { type: DataTypes.STRING },
  },
  { sequelize, modelName: "image", tableName: "images" }
);

// métodos para las llamadas CRUD

function showAll() {
  return Image.findAll()
    .then((images) => {})
    .catch();
}

function createImage(imageName, imageComment, imageUrl) {
  Image.create({
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
//updateImage();
//createImage();
//deleteImage(3);

/* enrutadores */

app.get("/", function (req, res) {
  res.send(showAll());
});

app.get("/delete", function (req, res) {});

app.post("/upload", upload.single("file"), (req, res) => {
  res.json({ file: req.file });
  //console.log(res.json());
  let RenamedImage = req.file.filename;
  let OriginalName = req.file.originalname;
  const nameInDB = Image.findAll({
    where: {
      name: OriginalName,
    },
  }).then((images) => {
    console.log(images);
  });
  console.log(nameInDB);
  fs.rename(
    "./images/" + RenamedImage,
    "./images/" + RenamedImage + ".jpg",
    (err) => {
      fs.stat("./images/" + RenamedImage + ".jpg", (err, stats) => {
        console.log(`stats: ${JSON.stringify(stats)}`);
      });
    }
  );
  const comment = "";
  createImage(
    RenamedImage + ".jpg",
    comment,
    "./images/" + RenamedImage + ".jpg"
  );
});

app.post("/update", function (req, res) {});
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
