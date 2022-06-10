require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");
const cors = require("cors");

const {
  newUserController,
  getUserController,
  getMyUserController,
  loginController,
} = require("./controllers/users");

const {
  getEnlacesController,
  newEnlaceController,
  getSingleEnlaceController,
  deleteEnlaceController,
  votarEnlaceController,
  borrarVotoController,
} = require("./controllers/enlaces");

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(fileUpload());
app.use("/upload", express.static("./uploads"));
app.use(cors());

const { authUser } = require("./middlewares/auth");

//Rutas de los usuarios

app.post("/user", newUserController);
app.get("/user", authUser, getMyUserController);
app.get("/user/:id", getUserController);
app.post("/login", loginController);

//Rutas de los enlaces

app.get("/", authUser, getEnlacesController);
app.post("/", authUser, newEnlaceController);
app.get("/enlace/:id", authUser, getSingleEnlaceController);
app.delete("/enlace/:id", authUser, deleteEnlaceController);
app.post("/votos/:enlaceId", authUser, votarEnlaceController);
app.delete("/votos/:enlaceId", authUser, borrarVotoController);

//Middleware de 404

app.use((req, res) => {
  res.status(404).send({
    status: "error",
    message: "Not fount",
  });
});

//Middleware de gestion de errores
app.use((error, req, res, next) => {
  res.status(error.httpStatus_ || 500).send({
    status: "error",
    message: error.message,
  });
});

//Lanzamiento de server

app.listen(4000, () => {
  console.log("Servidior funcionando");
});
