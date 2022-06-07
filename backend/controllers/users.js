const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateError } = require("../helpers");
const { createUser, getUserbyEmail, getUserbyId } = require("../db/users");

const newUserController = async (req, res, next) => {
  try {
    const { name, surname, email, password } = req.body;
    if (!email || !password || !name || !surname) {
      throw generateError("Completar todos los campos", 400);
    }
    const id = await createUser(email, password, name, surname);

    res.send({
      status: "ok",
      message: `User created with id: ${id}`,
    });
  } catch (error) {
    next(error);
  }
};

const getUserController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await getUserbyId(id);
    res.send({
      status: "ok",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw generateError("Debes enviar un email y password", 400);
    }

    //Recojo los datos de la base de datos del usuario con ese email

    const user = await getUserbyEmail(email);

    //Compruebo que las contraseña coinciden

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      throw generateError("La contraseña no coincide", 401);
    }

    //Creo el payload del token

    const payload = { id: user.id };

    //Firmo el token

    const token = jwt.sign(payload, process.env.SECRET, {
      expiresIn: "30d",
    });

    //Envio el token

    res.send({ token: token });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  newUserController,
  getUserController,
  loginController,
};
