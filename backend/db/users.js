const bcrypt = require("bcrypt");
const { generateError } = require("../helpers");
const { getConnection } = require("./db");

// DEVUELVE LA INFORMACION PUBLICA DEL USUARIO POR SU EMAIL

const getUserbyEmail = async (email) => {
  let connection;

  try {
    connection = await getConnection();

    const [result] = await connection.query(
      `SELECT * FROM users where email = ?`,
      [email]
    );

    if (result.length === 0) {
      throw generateError("No hay ningun usuario con ese email", 404);
    }
    return result[0];
  } finally {
    if (connection) connection.release();
  }
};

// DEVUELVE LA INFORMACION PUBLICA DEL USUARIO POR SU ID

const getUserbyId = async (id) => {
  let connection;

  try {
    connection = await getConnection();

    const [result] = await connection.query(
      `SELECT id, email, created_at, name, surname FROM users WHERE id=?`,
      [id]
    );

    if (result.length === 0) {
      throw generateError("No hay ningun usuario con esa id", 404);
    }
    return result[0];
  } finally {
    if (connection) connection.release();
  }
};

//CREAR USUARIO DE LA BBDD Y QUE DEVUELVE SU ID

const createUser = async (email, password, name, surname) => {
  let connection;

  try {
    connection = await getConnection();
    // Comprobacion de no repeticion de usuario
    const [user] = await connection.query(
      `SELECT id FROM users WHERE email = ?`,
      [email]
    );

    if (user.length > 0) {
      throw generateError(
        "Ya existe unusuario en la base de datos con ese email",
        409
      );
    }
    // Encripar password
    const passwordHash = await bcrypt.hash(password, 8);
    // Crear usuario
    const [newUser] = await connection.query(
      `INSERT INTO users (email, password, name, surname) VALUES(?, ?, ?, ?)`,
      [email, passwordHash, name, surname]
    );
    // Devolver ID

    return newUser.insertId;
  } finally {
    if (connection) connection.release();
  }
};
module.exports = {
  createUser,
  getUserbyId,
  getUserbyEmail,
};
