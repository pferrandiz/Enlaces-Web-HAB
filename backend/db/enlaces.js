const { generateError } = require("../helpers");
const { getConnection } = require("./db");

const getEnlaceById = async (id) => {
  let connection;
  console.log(id);
  try {
    connection = await getConnection();

    const [result] = await connection.query(
      `
      select enlaces.*, count(votos.id) as votos from enlaces left join votos on enlaces.id = votos.enlace_id where enlaces.id = ? group by enlace_id;
    `,
      [id]
    );

    if (result.length === 0) {
      throw generateError(`El enlace con id: ${id} no existe`, 404);
    }

    return result[0];
  } finally {
    if (connection) connection.release();
  }
};

const deleteEnlaceById = async (id) => {
  let connection;

  try {
    connection = await getConnection();

    await connection.query(
      `
DELETE FROM enlaces WHERE id=?
`,
      [id]
    );

    return;
  } finally {
    if (connection) connection.release();
  }
};

const getAllEnlaces = async () => {
  let connection;

  try {
    connection = await getConnection();

    const [result] = await connection.query(`
select enlaces.*, count(votos.id) as votos from enlaces left join votos on votos.enlace_id = enlaces.id group by enlaces.id ORDER BY created_at DESC;`);
    return result;
  } finally {
    if (connection) connection.release();
  }
};

const createEnlace = async (userId, text, title, url, image = "") => {
  let connection;
  console.log(userId, text, title, url, image);
  try {
    connection = await getConnection();
    const [result] = await connection.query(
      `
    INSERT INTO enlaces (user_id, text, title, url, image)
    VALUES(?,?,?,?,?)
    `,
      [userId, text, title, url, image]
    );
    return result.insertId;
  } finally {
    if (connection) connection.release();
  }
};

const votarEnlace = async (userid, enlaceid) => {
  let connection;

  try {
    connection = await getConnection();
    // Comprobacion de no repeticion de voto
    const [voto] = await connection.query(
      `SELECT id FROM votos WHERE user_id = ? and  enlace_id = ?`,
      [userid, enlaceid]
    );

    if (voto.length > 0) {
      throw generateError("Ya has votado ese enlace", 409);
    }

    // Crear voto
    const [newvoto] = await connection.query(
      `INSERT INTO votos (user_id, enlace_id) VALUES(?, ? )`,
      [userid, enlaceid]
    );
    // Devolver ID

    return newvoto.insertId;
  } finally {
    if (connection) connection.release();
  }
};

const borrarVotoEnlace = async (userid, enlaceid) => {
  let connection;

  try {
    connection = await getConnection();
    // Comprobacion de no repeticion de voto
    await connection.query(
      `DELETE FROM votos WHERE user_id = ? and  enlace_id = ?`,
      [userid, enlaceid]
    );

    return enlaceid;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = {
  createEnlace,
  getAllEnlaces,
  getEnlaceById,
  deleteEnlaceById,
  votarEnlace,
  borrarVotoEnlace,
};
